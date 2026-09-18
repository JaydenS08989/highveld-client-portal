import { useCallback, useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/router'

type Credentials = {
  emailAddress: string
  password: string
}

type LoginStep = 'credentials' | 'device-trust'

type LoginAlert = {
  message: string
  title: string
}

export function useLogin() {
  const router = useRouter()
  const { errors, fetchStatus, signIn } = useSignIn()
  const [alert, setAlert] = useState<LoginAlert | null>(null)
  const [step, setStep] = useState<LoginStep>('credentials')

  const finalizeSignIn = useCallback(async () => {
    await signIn.finalize({
      navigate: ({ decorateUrl, session }) => {
        if (session?.currentTask) {
          setAlert({
            title: 'Account action required',
            message: 'Your account has an outstanding security task. Complete it before continuing to the portal.',
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
          message: 'We could not sign you in. Check your details and try again.',
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
            message: 'This account requires an additional verification method that is not enabled in this login screen.',
          })
          return
        }

        await signIn.mfa.sendEmailCode()
        setStep('device-trust')
        setAlert({
          title: 'Verification code sent',
          message: 'Enter the code sent to your verified email address to finish signing in.',
        })
        return
      }

      if (signIn.status === 'needs_second_factor') {
        setAlert({
          title: 'Additional verification required',
          message: 'This account uses multi-factor authentication. Add the factor your Clerk application requires before enabling this login flow for that account.',
        })
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
          message: 'The code could not be verified. Check it and try again.',
        })
        return
      }

      if (signIn.status === 'complete') {
        await finalizeSignIn()
        return
      }

      setAlert({
        title: 'Verification incomplete',
        message: 'Your account still needs another verification step before access can be granted.',
      })
    },
    [finalizeSignIn, signIn],
  )

  const resendDeviceCode = useCallback(async () => {
    setAlert(null)
    await signIn.mfa.sendEmailCode()
    setAlert({
      title: 'New code sent',
      message: 'A new verification code has been sent to your verified email address.',
    })
  }, [signIn])

  const restart = useCallback(() => {
    signIn.reset()
    setAlert(null)
    setStep('credentials')
  }, [signIn])

  return {
    alert,
    clearAlert: () => setAlert(null),
    emailError: errors.fields.identifier?.message,
    isSubmitting: fetchStatus === 'fetching',
    passwordError: errors.fields.password?.message,
    resendDeviceCode,
    restart,
    step,
    submitCredentials,
    verificationError: errors.fields.code?.message,
    verifyDevice,
  }
}
