import type { ReactNode } from 'react'

type AuthLayoutProps = {
  form: ReactNode
  marketing: ReactNode
}

export function AuthLayout({ form, marketing }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
      <section className="flex min-h-[42vh] w-full flex-1 lg:min-h-screen lg:w-1/2">{marketing}</section>
      <section className="flex w-full flex-1 items-center justify-center bg-white px-6 py-10 sm:px-10 lg:min-h-screen lg:w-1/2 lg:px-14 xl:px-20">
        <div className="flex w-full max-w-md flex-col">{form}</div>
      </section>
    </main>
  )
}
