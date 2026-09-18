import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, RotateCcw, UserRound } from 'lucide-react'

import { BrandMark } from '@/components/brand/brand-mark'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { useRegister } from '@/hooks/use-register'

export function RegisterForm() {
  const [code, setCode] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const { alert, clearAlert, errors, isSubmitting, register, resend, restart, step, verify } =
    useRegister()

  if (step === 'verify') {
    return (
      <div className="grid gap-8 sm:gap-10">
        <BrandMark />
        <div className="grid gap-7">
          <div className="grid gap-2">
            <span className="text-xs font-semibold tracking-[0.14em] text-brand-700 uppercase">
              Verify your email
            </span>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Almost there
            </h1>
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Enter the six-digit code sent to {emailAddress}.
            </p>
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
              void verify(code)
            }}
          >
            <FormField error={errors.fields.code?.message} htmlFor="registration-code" label="Verification code">
              <Input
                autoComplete="one-time-code"
                id="registration-code"
                inputMode="numeric"
                maxLength={8}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Enter your code"
                required
                value={code}
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
              <Button onClick={() => void resend()} variant="secondary">
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

  return (
    <div className="grid gap-8 sm:gap-10">
      <BrandMark />
      <div className="grid gap-7">
        <div className="grid gap-2">
          <span className="text-xs font-semibold tracking-[0.14em] text-brand-700 uppercase">
            New client account
          </span>
          <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Create your portal account
          </h1>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            Register to securely collaborate with Highveld Advisory on accounting, tax, payroll, and compliance work.
          </p>
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
            void register({ emailAddress, firstName, lastName, password })
          }}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField error={errors.fields.firstName?.message} htmlFor="first-name" label="First name">
              <Input
                autoComplete="given-name"
                id="first-name"
                leadingIcon={<UserRound aria-hidden="true" className="size-4" strokeWidth={1.8} />}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="First name"
                required
                value={firstName}
              />
            </FormField>
            <FormField error={errors.fields.lastName?.message} htmlFor="last-name" label="Last name">
              <Input
                autoComplete="family-name"
                id="last-name"
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Last name"
                required
                value={lastName}
              />
            </FormField>
          </div>
          <FormField error={errors.fields.emailAddress?.message} htmlFor="registration-email" label="Email address">
            <Input
              autoComplete="email"
              id="registration-email"
              inputMode="email"
              leadingIcon={<Mail aria-hidden="true" className="size-4" strokeWidth={1.8} />}
              onChange={(event) => setEmailAddress(event.target.value)}
              placeholder="name@company.co.za"
              required
              type="email"
              value={emailAddress}
            />
          </FormField>
          <FormField error={errors.fields.password?.message} htmlFor="registration-password" label="Password">
            <PasswordInput
              autoComplete="new-password"
              id="registration-password"
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a secure password"
              required
              value={password}
            />
          </FormField>
          <div id="clerk-captcha" />
          <Button
            fullWidth
            loading={isSubmitting}
            trailingIcon={<ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.8} />}
            type="submit"
          >
            Create account
          </Button>
        </form>

        <p className="text-sm text-slate-500">
          Already registered?{' '}
          <Link className="font-semibold text-brand-700 hover:text-brand-800" href="/">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
