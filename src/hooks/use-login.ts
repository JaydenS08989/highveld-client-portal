import { useCallback, useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/router'

type Credentials = {
  emailAddress: string
  password: string
}

type LoginStep = 'credentials' | 'device-trust' | 'mfa'

type MfaStrategy = 'backup_code' | 'totp'

type LoginAlert = {
  message: string
  title: string
}

export function useLogin() {
  const router = useRouter()
  const { errors, fetchStatus, signIn } = useSignIn()
  const [alert, setAlert] = useState<LoginAlert | null>(null)
  const [availableMfaStrategies, setAvailableMfaStrategies] = useState<MfaStrategy[]>([])
  const [mfaStrategy, setMfaStrategy] = useState<MfaStrategy>('totp')
  const [step, setStep] = useState<LoginStep>('credentials')

  const finalizeSignIn = useCallback(async () => {
    await signIn.finalize({
      navigate: ({ decorateUrl, session }) => {
        if (session?.currentTask) {
          setAlert({
            title: 'Account action required',
            message: 'Your account has an outstanding security task. Complete it before continuing.',
          })
          return
        }

        const url = decorateUrl('/dashboard')

        if (url.startsWith('http')) {
          window.location.assign(url)
          return
        }

        void router.push(url)
      },
    })
  }, [router, signIn])

  const submitCredentials = useCallback(
    async ({ emailAddress, password }: Credentials) => {
      setAlert(null)

      const { error } = await signIn.password({
        emailAddress: emailAddress.trim().toLowerCase(),
        password,
      })

      if (error) {
        setAlert({
          title: 'Sign-in failed',
          message: error.longMessage ?? error.message ?? 'Check your details and try again.',
        })
        return
      }

      if (signIn.status === 'complete') {
        await finalizeSignIn()
        return
      }

      if (signIn.status === 'needs_client_trust') {
        const emailFactor = signIn.supportedSecondFactors.find((factor) => factor.strategy === 'email_code')

        if (!emailFactor) {
          setAlert({
            title: 'Verification unavailable',
            message: 'This account requires an additional verification method.',
          })
          return
        }

        const verification = await signIn.mfa.sendEmailCode()

        if (verification.error) {
          setAlert({
            title: 'Code not sent',
            message: verification.error.longMessage ?? verification.error.message,
          })
          return
        }

        setStep('device-trust')
        setAlert({
          title: 'Verification code sent',
          message: 'Enter the code sent to your verified email address.',
        })
        return
      }

      if (signIn.status === 'needs_second_factor') {
        const supportsTotp = signIn.supportedSecondFactors.some((factor) => factor.strategy === 'totp')
        const supportsBackupCode = signIn.supportedSecondFactors.some(
          (factor) => factor.strategy === 'backup_code',
        )

        if (!supportsTotp && !supportsBackupCode) {
          setAlert({
            title: 'Unsupported second factor',
            message: 'This account requires a second-factor method that is not enabled in this portal.',
          })
          return
        }

        const strategies: MfaStrategy[] = [
          ...(supportsTotp ? (['totp'] as MfaStrategy[]) : []),
          ...(supportsBackupCode ? (['backup_code'] as MfaStrategy[]) : []),
        ]

        setAvailableMfaStrategies(strategies)
        setMfaStrategy(strategies[0])
        setStep('mfa')
        return
      }

      setAlert({
        title: 'Unable to continue',
        message: 'Your sign-in needs an additional account step before access can be granted.',
      })
    },
    [finalizeSignIn, signIn],
  )

  const verifyDevice = useCallback(
    async (code: string) => {
      setAlert(null)
      const { error } = await signIn.mfa.verifyEmailCode({ code: code.trim() })

      if (error) {
        setAlert({
          title: 'Invalid verification code',
          message: error.longMessage ?? error.message ?? 'Check the code and try again.',
        })
        return
      }

      if (signIn.status === 'complete') {
        await finalizeSignIn()
      }
    },
    [finalizeSignIn, signIn],
  )

  const verifyMfa = useCallback(
    async (code: string) => {
      setAlert(null)

      const result =
        mfaStrategy === 'totp'
          ? await signIn.mfa.verifyTOTP({ code: code.trim() })
          : await signIn.mfa.verifyBackupCode({ code: code.trim() })

      if (result.error) {
        setAlert({
          title: 'Verification failed',
          message: result.error.longMessage ?? result.error.message ?? 'Check the code and try again.',
        })
        return
      }

      if (signIn.status === 'complete') {
        await finalizeSignIn()
      }
    },
    [finalizeSignIn, mfaStrategy, signIn],
  )

  const resendDeviceCode = useCallback(async () => {
    setAlert(null)
    const { error } = await signIn.mfa.sendEmailCode()

    setAlert(
      error
        ? { title: 'Code not sent', message: error.longMessage ?? error.message }
        : { title: 'New code sent', message: 'A fresh verification code has been sent to your email address.' },
    )
  }, [signIn])

  const restart = useCallback(() => {
    signIn.reset()
    setAlert(null)
    setStep('credentials')
  }, [signIn])

  return {
    alert,
    availableMfaStrategies,
    clearAlert: () => setAlert(null),
    emailError: errors.fields.identifier?.message,
    isSubmitting: fetchStatus === 'fetching',
    mfaStrategy,
    passwordError: errors.fields.password?.message,
    resendDeviceCode,
    restart,
    setMfaStrategy,
    step,
    submitCredentials,
    verificationError: errors.fields.code?.message,
    verifyDevice,
    verifyMfa,
  }
}
