import { useState } from 'react'
import { ArrowRight, Mail, RotateCcw, ShieldCheck } from 'lucide-react'

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
    clearAlert,
    emailError,
    isSubmitting,
    passwordError,
    resendDeviceCode,
    restart,
    step,
    submitCredentials,
    verificationError,
    verifyDevice,
  } = useLogin()

  if (step === 'device-trust') {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex size-12 items-center justify-center border border-brand-200 bg-brand-50 text-brand-700">
            <ShieldCheck aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Verify this device</h2>
            <p className="text-sm leading-6 text-slate-500">
              Enter the verification code sent by Highveld to your verified email address.
            </p>
          </div>
        </div>
        {alert && (
          <Alert onDismiss={clearAlert} title={alert.title} variant="info">
            {alert.message}
          </Alert>
        )}
        <form
          className="flex flex-col gap-5"
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
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" onClick={() => void resendDeviceCode()} variant="secondary">
              Send a new code
            </Button>
            <Button
              className="flex-1"
              onClick={restart}
              trailingIcon={<RotateCcw aria-hidden="true" className="size-4" strokeWidth={1.8} />}
              variant="secondary"
            >
              Start over
            </Button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold tracking-[0.18em] text-brand-700 uppercase">Secure client access</span>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h2>
          <p className="text-sm leading-6 text-slate-500">Sign in with the email address linked to your Highveld client account.</p>
        </div>
      </div>
      {alert && (
        <Alert onDismiss={clearAlert} title={alert.title} variant="error">
          {alert.message}
        </Alert>
      )}
      <form
        className="flex flex-col gap-5"
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
          Sign in to portal
        </Button>
      </form>
      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 text-sm text-slate-500">
        <p>Need access? Contact the account manager who invited you to the portal.</p>
        <p className="text-xs leading-5 text-slate-400">Protected by Clerk. Do not share your password or verification codes.</p>
      </div>
    </div>
  )
}
