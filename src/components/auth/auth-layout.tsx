import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/router'

type AuthLayoutProps = {
  form: ReactNode
  marketing: ReactNode
}

export function AuthLayout({ form, marketing }: AuthLayoutProps) {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      void router.replace('/dashboard')
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || isSignedIn) {
    return <main className="grid min-h-screen place-items-center bg-white" />
  }

  return (
    <main className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
      <section className="order-2 grid min-h-56 bg-brand-50 sm:min-h-72 lg:order-1 lg:min-h-screen">
        {marketing}
      </section>
      <section className="order-1 grid bg-white px-5 py-8 sm:px-8 sm:py-10 lg:order-2 lg:min-h-screen lg:place-items-center lg:px-12 xl:px-16 2xl:px-24">
        <div className="grid w-full max-w-[440px] content-start">{form}</div>
      </section>
    </main>
  )
}
