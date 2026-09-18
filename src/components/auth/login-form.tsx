import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, KeyRound, Mail, RotateCcw, ShieldCheck } from 'lucide-react'

import { BrandMark } from '@/components/brand/brand-mark'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useLogin } from '@/hooks/use-login'

export function LoginForm() {
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const {
    alert,
    availableMfaStrategies,
    clearAlert,
    emailError,
    isSubmitting,
    mfaStrategy,
    passwordError,
    resendDeviceCode,
    restart,
    setMfaStrategy,
    step,
    submitCredentials,
    verificationError,
    verifyDevice,
    verifyMfa,
  } = useLogin()

  if (step === 'device-trust') {
    return (
      <div className="grid gap-8 sm:gap-10">
        <BrandMark />
        <div className="grid gap-7">
          <div className="grid gap-4">
            <div className="grid size-11 place-items-center bg-brand-50 text-brand-700">
              <ShieldCheck aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </div>
            <div className="grid gap-2">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Verify this device
              </h1>
              <p className="max-w-sm text-sm leading-6 text-slate-500">
                Enter the verification code sent to your verified email address.
              </p>
            </div>
          </div>
          {alert && (
            <Alert onDismiss={clearAlert} title={alert.title} variant="info">
              {alert.message}
            </Alert>
          )}
          <form
            className="grid gap-5"
            onSubmit={(event) => {
              event.preventDefault()
              void verifyDevice(verificationCode)
            }}
          >
            <FormField error={verificationError} htmlFor="verification-code" label="Verification code">
              <Input
                autoComplete="one-time-code"
                id="verification-code"
                inputMode="numeric"
                invalid={Boolean(verificationError)}
                maxLength={8}
                name="verification-code"
                onChange={(event) => setVerificationCode(event.target.value)}
                placeholder="Enter your code"
                required
                value={verificationCode}
              />
            </FormField>
            <Button
              fullWidth
              loading={isSubmitting}
              trailingIcon={<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.8} />}
              type="submit"
            >
              Verify and continue
            </Button>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Button onClick={() => void resendDeviceCode()} variant="secondary">
                Send new code
              </Button>
              <Button
                onClick={restart}
                trailingIcon={<RotateCcw aria-hidden="true" className="size-4" strokeWidth={1.8} />}
                variant="ghost"
              >
                Start over
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (step === 'mfa') {
    return (
      <div className="grid gap-8 sm:gap-10">
        <BrandMark />
        <div className="grid gap-7">
          <div className="grid gap-4">
            <div className="grid size-11 place-items-center bg-brand-50 text-brand-700">
              <KeyRound aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </div>
            <div className="grid gap-2">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Two-factor authentication
              </h1>
              <p className="max-w-sm text-sm leading-6 text-slate-500">
                {mfaStrategy === 'totp'
                  ? 'Enter the code from your authenticator app.'
                  : 'Enter one of your unused backup codes.'}
              </p>
            </div>
          </div>
          {alert && (
            <Alert onDismiss={clearAlert} title={alert.title} variant="error">
              {alert.message}
            </Alert>
          )}
          <form
            className="grid gap-5"
            onSubmit={(event) => {
              event.preventDefault()
              void verifyMfa(verificationCode)
            }}
          >
            <FormField error={verificationError} htmlFor="mfa-code" label={mfaStrategy === 'totp' ? 'Authenticator code' : 'Backup code'}>
              <Input
                autoComplete="one-time-code"
                id="mfa-code"
                inputMode={mfaStrategy === 'totp' ? 'numeric' : 'text'}
                onChange={(event) => setVerificationCode(event.target.value)}
                placeholder={mfaStrategy === 'totp' ? '123456' : 'Enter backup code'}
                required
                value={verificationCode}
              />
            </FormField>
            <Button
              fullWidth
              loading={isSubmitting}
              trailingIcon={<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.8} />}
              type="submit"
            >
              Verify and continue
            </Button>
            <div className={`grid grid-cols-1 gap-2 ${availableMfaStrategies.length > 1 ? 'sm:grid-cols-2' : ''}`}>
              {availableMfaStrategies.length > 1 && (
                <Button
                  onClick={() => setMfaStrategy(mfaStrategy === 'totp' ? 'backup_code' : 'totp')}
                  variant="secondary"
                >
                  Use {mfaStrategy === 'totp' ? 'backup code' : 'authenticator'}
                </Button>
              )}
              <Button onClick={restart} variant="ghost">
                Start over
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 sm:gap-10">
      <BrandMark />
      <div className="grid gap-7">
        <div className="grid gap-3">
          <span className="text-xs font-semibold tracking-[0.14em] text-brand-700 uppercase">
            Client access
          </span>
          <div className="grid gap-2">
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Welcome back
            </h1>
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Sign in to securely access your Highveld Advisory workspace.
            </p>
          </div>
        </div>
        {alert && (
          <Alert onDismiss={clearAlert} title={alert.title} variant="error">
            {alert.message}
          </Alert>
        )}
        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault()
            void submitCredentials({ emailAddress, password })
          }}
        >
          <FormField error={emailError} htmlFor="email-address" label="Email address">
            <Input
              autoComplete="email"
              id="email-address"
              inputMode="email"
              invalid={Boolean(emailError)}
              leadingIcon={<Mail aria-hidden="true" className="size-4" strokeWidth={1.8} />}
              name="email"
              onChange={(event) => setEmailAddress(event.target.value)}
              placeholder="name@company.co.za"
              required
              type="email"
              value={emailAddress}
            />
          </FormField>
          <FormField error={passwordError} htmlFor="password" label="Password">
            <PasswordInput
              autoComplete="current-password"
              id="password"
              invalid={Boolean(passwordError)}
              minLength={8}
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              value={password}
            />
          </FormField>
          <Button
            fullWidth
            loading={isSubmitting}
            trailingIcon={<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.8} />}
            type="submit"
          >
            Sign in
          </Button>
        </form>
        <p className="text-sm text-slate-500">
          New to Highveld?{' '}
          <Link className="font-semibold text-brand-700 hover:text-brand-800" href="/register">
            Create an account
          </Link>
        </p>
      </div>
      <div className="grid gap-1 border-t border-slate-200 pt-5">
        <p className="text-xs leading-5 text-slate-500">
          Protected with device verification and optional two-factor authentication.
        </p>
        <p className="text-xs leading-5 text-slate-400">
          Never share your password, verification code, or backup codes.
        </p>
      </div>
    </div>
  )
}
