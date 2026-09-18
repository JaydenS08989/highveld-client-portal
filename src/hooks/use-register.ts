import { useCallback, useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/router'

type RegisterDetails = {
  emailAddress: string
  firstName: string
  lastName: string
  password: string
}

type RegisterAlert = {
  message: string
  title: string
}

type RegisterStep = 'details' | 'verify'

export function useRegister() {
  const router = useRouter()
  const { errors, fetchStatus, signUp } = useSignUp()
  const [alert, setAlert] = useState<RegisterAlert | null>(null)
  const [step, setStep] = useState<RegisterStep>('details')

  const finalize = useCallback(async () => {
    await signUp.finalize({
      navigate: ({ decorateUrl, session }) => {
        if (session?.currentTask) {
          setAlert({
            title: 'Security setup required',
            message: 'Finish the required security step before entering the portal.',
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
  }, [router, signUp])

  const register = useCallback(
    async ({ emailAddress, firstName, lastName, password }: RegisterDetails) => {
      setAlert(null)

      const { error } = await signUp.password({
        emailAddress: emailAddress.trim().toLowerCase(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password,
      })

      if (error) {
        setAlert({
          title: 'Registration failed',
          message: error.longMessage ?? error.message ?? 'We could not create your account.',
        })
        return
      }

      if (signUp.status === 'complete') {
        await finalize()
        return
      }

      const verification = await signUp.verifications.sendEmailCode()

      if (verification.error) {
        setAlert({
          title: 'Verification unavailable',
          message: verification.error.longMessage ?? verification.error.message,
        })
        return
      }

      setStep('verify')
      setAlert({
        title: 'Check your inbox',
        message: 'We sent a verification code to your email address.',
      })
    },
    [finalize, signUp],
  )

  const verify = useCallback(
    async (code: string) => {
      setAlert(null)

      const { error } = await signUp.verifications.verifyEmailCode({ code: code.trim() })

      if (error) {
        setAlert({
          title: 'Invalid verification code',
          message: error.longMessage ?? error.message ?? 'Check the code and try again.',
        })
        return
      }

      if (signUp.status === 'complete') {
        await finalize()
        return
      }

      setAlert({
        title: 'Registration incomplete',
        message: 'Your account still needs an additional verification step.',
      })
    },
    [finalize, signUp],
  )

  const resend = useCallback(async () => {
    setAlert(null)
    const { error } = await signUp.verifications.sendEmailCode()

    setAlert(
      error
        ? {
            title: 'Code not sent',
            message: error.longMessage ?? error.message,
          }
        : {
            title: 'New code sent',
            message: 'A fresh verification code has been sent to your email address.',
          },
    )
  }, [signUp])

  const restart = useCallback(() => {
    signUp.reset()
    setStep('details')
    setAlert(null)
  }, [signUp])

  return {
    alert,
    clearAlert: () => setAlert(null),
    errors,
    isSubmitting: fetchStatus === 'fetching',
    register,
    resend,
    restart,
    step,
    verify,
  }
}
