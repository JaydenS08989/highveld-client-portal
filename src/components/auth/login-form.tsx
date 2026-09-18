import { useState } from 'react'
import { ArrowRight, Mail, RotateCcw, ShieldCheck } from 'lucide-react'

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
      <div className="flex flex-col gap-10">
        <BrandMark />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex size-11 items-center justify-center bg-brand-50 text-brand-700">
              <ShieldCheck aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
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
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-12">
      <BrandMark />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-[0.16em] text-brand-700 uppercase">
            Client access
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950">
              Welcome back
            </h1>
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Sign in to securely access your Highveld client workspace.
            </p>
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
            Sign in
          </Button>
        </form>
      </div>

      <div className="flex flex-col gap-1 border-t border-slate-200 pt-5">
        <p className="text-xs leading-5 text-slate-500">
          Secure access for invited Highveld clients.
        </p>
        <p className="text-xs leading-5 text-slate-400">
          Never share your password or verification code.
        </p>
      </div>
    </div>
  )
}
