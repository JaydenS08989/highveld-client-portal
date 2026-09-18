import type { ReactNode } from 'react'

type AuthLayoutProps = {
  form: ReactNode
  marketing: ReactNode
}

export function AuthLayout({ form, marketing }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
      <section className="flex min-h-64 w-full bg-white lg:min-h-screen lg:w-[56%]">
        {marketing}
      </section>
      <section className="flex w-full flex-1 items-center justify-center bg-white px-6 py-10 sm:px-10 lg:min-h-screen lg:w-[44%] lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex w-full max-w-[420px] flex-col">{form}</div>
      </section>
    </main>
  )
}
