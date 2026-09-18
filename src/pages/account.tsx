import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useReverification, useUser } from '@clerk/nextjs'
import { QRCodeSVG } from 'qrcode.react'
import { Copy, KeyRound, ShieldCheck, UserRound } from 'lucide-react'

import { PortalLayout } from '@/components/portal/portal-layout'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { getProtectedPageProps } from '@/lib/protected-page'

type Notice = {
  message: string
  title: string
  variant: 'error' | 'success'
}

type TotpSetup = {
  backupCodes: string[]
  secret: string
  uri: string
}

export default function AccountPage() {
  const { isLoaded, user } = useUser()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [notice, setNotice] = useState<Notice | null>(null)
  const [totpSetup, setTotpSetup] = useState<TotpSetup | null>(null)
  const [totpCode, setTotpCode] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [savingTotp, setSavingTotp] = useState(false)

  useEffect(() => {
    if (!user) {
      return
    }

    setFirstName(user.firstName ?? '')
    setLastName(user.lastName ?? '')
  }, [user])

  const updatePassword = useReverification(async (current: string, next: string) => {
    if (!user) {
      return
    }

    await user.updatePassword({
      currentPassword: current,
      newPassword: next,
      signOutOfOtherSessions: true,
    })
  })

  const disableTotp = useReverification(async () => {
    if (!user) {
      return
    }

    await user.disableTOTP()
    await user.reload()
  })

  const saveProfile = async () => {
    if (!user) {
      return
    }

    setSavingProfile(true)
    setNotice(null)

    try {
      await user.update({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      })
      setNotice({
        title: 'Profile updated',
        message: 'Your account details have been saved.',
        variant: 'success',
      })
    } catch {
      setNotice({
        title: 'Profile not updated',
        message: 'Check your details and try again.',
        variant: 'error',
      })
    } finally {
      setSavingProfile(false)
    }
  }

  const savePassword = async () => {
    if (!currentPassword || !newPassword) {
      return
    }

    setSavingPassword(true)
    setNotice(null)

    try {
      await updatePassword(currentPassword, newPassword)
      setCurrentPassword('')
      setNewPassword('')
      setNotice({
        title: 'Password updated',
        message: 'Your password was changed and your other sessions were signed out.',
        variant: 'success',
      })
    } catch {
      setNotice({
        title: 'Password not updated',
        message: 'Confirm your current password and make sure the new password meets the security requirements.',
        variant: 'error',
      })
    } finally {
      setSavingPassword(false)
    }
  }

  const beginTotpSetup = async () => {
    if (!user) {
      return
    }

    setSavingTotp(true)
    setNotice(null)

    try {
      const resource = await user.createTOTP()

      if (!resource.uri || !resource.secret) {
        throw new Error('TOTP configuration unavailable')
      }

      setTotpSetup({
        backupCodes: resource.backupCodes ?? [],
        secret: resource.secret,
        uri: resource.uri,
      })
    } catch {
      setNotice({
        title: 'Authenticator setup unavailable',
        message: 'Enable the Authenticator application strategy in Clerk and try again.',
        variant: 'error',
      })
    } finally {
      setSavingTotp(false)
    }
  }

  const verifyTotp = async () => {
    if (!user || !totpCode.trim()) {
      return
    }

    setSavingTotp(true)
    setNotice(null)

    try {
      const verified = await user.verifyTOTP({ code: totpCode.trim() })
      await user.reload()
      setTotpSetup((current) =>
        current
          ? {
              ...current,
              backupCodes: verified.backupCodes ?? current.backupCodes,
            }
          : current,
      )
      setTotpCode('')
      setNotice({
        title: 'Two-factor authentication enabled',
        message: 'Authenticator codes will now be required when Clerk requests a second factor.',
        variant: 'success',
      })
    } catch {
      setNotice({
        title: 'Authenticator code not verified',
        message: 'Enter the current six-digit code from your authenticator app and try again.',
        variant: 'error',
      })
    } finally {
      setSavingTotp(false)
    }
  }

  const removeTotp = async () => {
    setSavingTotp(true)
    setNotice(null)

    try {
      await disableTotp()
      setTotpSetup(null)
      setNotice({
        title: 'Authenticator removed',
        message: 'TOTP two-factor authentication has been disabled for your account.',
        variant: 'success',
      })
    } catch {
      setNotice({
        title: 'Authenticator not removed',
        message: 'Reverify your account and try again.',
        variant: 'error',
      })
    } finally {
      setSavingTotp(false)
    }
  }

  if (!isLoaded || !user) {
    return null
  }

  return (
    <>
      <Head>
        <title>Account & Security | Highveld Advisory</title>
      </Head>
      <PortalLayout eyebrow="Settings" title="Account & security">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
          <div className="grid content-start gap-5">
            {notice && (
              <Alert onDismiss={() => setNotice(null)} title={notice.title} variant={notice.variant}>
                {notice.message}
              </Alert>
            )}

            <section className="grid gap-5 border border-slate-200 bg-white p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center bg-brand-50 text-brand-700">
                  <UserRound aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
                </div>
                <div className="grid gap-1">
                  <h2 className="text-base font-semibold text-slate-950">Profile</h2>
                  <p className="text-xs leading-5 text-slate-500">Your identity details used across the client portal.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField htmlFor="account-first-name" label="First name">
                  <Input
                    id="account-first-name"
                    onChange={(event) => setFirstName(event.target.value)}
                    value={firstName}
                  />
                </FormField>
                <FormField htmlFor="account-last-name" label="Last name">
                  <Input
                    id="account-last-name"
                    onChange={(event) => setLastName(event.target.value)}
                    value={lastName}
                  />
                </FormField>
              </div>
              <FormField htmlFor="account-email" label="Primary email">
                <Input
                  disabled
                  id="account-email"
                  value={user.primaryEmailAddress?.emailAddress ?? ''}
                />
              </FormField>
              <div className="flex justify-end">
                <Button loading={savingProfile} onClick={() => void saveProfile()}>
                  Save profile
                </Button>
              </div>
            </section>

            <section className="grid gap-5 border border-slate-200 bg-white p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center bg-brand-50 text-brand-700">
                  <KeyRound aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
                </div>
                <div className="grid gap-1">
                  <h2 className="text-base font-semibold text-slate-950">Password</h2>
                  <p className="text-xs leading-5 text-slate-500">Changing your password signs out your other active sessions.</p>
                </div>
              </div>
              <FormField htmlFor="current-password" label="Current password">
                <PasswordInput
                  autoComplete="current-password"
                  id="current-password"
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  value={currentPassword}
                />
              </FormField>
              <FormField htmlFor="new-password" label="New password">
                <PasswordInput
                  autoComplete="new-password"
                  id="new-password"
                  minLength={8}
                  onChange={(event) => setNewPassword(event.target.value)}
                  value={newPassword}
                />
              </FormField>
              <div className="flex justify-end">
                <Button loading={savingPassword} onClick={() => void savePassword()}>
                  Update password
                </Button>
              </div>
            </section>
          </div>

          <section className="grid content-start gap-5 border border-slate-200 bg-white p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="grid size-10 shrink-0 place-items-center bg-brand-50 text-brand-700">
                <ShieldCheck aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
              </div>
              <div className="grid gap-1">
                <h2 className="text-base font-semibold text-slate-950">Two-factor authentication</h2>
                <p className="text-xs leading-5 text-slate-500">Use an authenticator app such as 1Password, Google Authenticator, or Microsoft Authenticator.</p>
              </div>
            </div>

            <div className="grid gap-3 bg-slate-50 p-4">
              <span className="text-xs font-semibold text-slate-500 uppercase">Status</span>
              <div className="flex items-center gap-2">
                <span className={`size-2 ${user.totpEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                <span className="text-sm font-semibold text-slate-900">
                  {user.totpEnabled ? 'Authenticator enabled' : 'Authenticator not configured'}
                </span>
              </div>
            </div>

            {!user.totpEnabled && !totpSetup && (
              <Button loading={savingTotp} onClick={() => void beginTotpSetup()}>
                Set up authenticator
              </Button>
            )}

            {!user.totpEnabled && totpSetup && (
              <div className="grid gap-5">
                <div className="grid place-items-center bg-white p-3">
                  <QRCodeSVG size={180} value={totpSetup.uri} />
                </div>
                <div className="grid gap-2">
                  <span className="text-xs font-semibold text-slate-700">Can't scan the QR code?</span>
                  <button
                    className="flex min-w-0 items-center gap-2 bg-slate-100 px-3 py-3 text-left text-xs text-slate-700"
                    onClick={() => void navigator.clipboard.writeText(totpSetup.secret)}
                    type="button"
                  >
                    <Copy aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.8} />
                    <span className="truncate">{totpSetup.secret}</span>
                  </button>
                </div>
                <FormField htmlFor="totp-setup-code" label="Authenticator code">
                  <Input
                    autoComplete="one-time-code"
                    id="totp-setup-code"
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(event) => setTotpCode(event.target.value)}
                    placeholder="123456"
                    value={totpCode}
                  />
                </FormField>
                <Button loading={savingTotp} onClick={() => void verifyTotp()}>
                  Verify authenticator
                </Button>
              </div>
            )}

            {user.totpEnabled && (
              <Button loading={savingTotp} onClick={() => void removeTotp()} variant="danger">
                Remove authenticator
              </Button>
            )}

            {totpSetup?.backupCodes.length ? (
              <div className="grid gap-3 border-t border-slate-200 pt-5">
                <div className="grid gap-1">
                  <span className="text-sm font-semibold text-slate-950">Backup codes</span>
                  <span className="text-xs leading-5 text-slate-500">
                    Store these somewhere safe. Each code can only be used once.
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {totpSetup.backupCodes.map((code) => (
                    <code className="bg-slate-100 px-3 py-2 text-xs text-slate-700" key={code}>
                      {code}
                    </code>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </PortalLayout>
    </>
  )
}

export const getServerSideProps = getProtectedPageProps
