import Head from 'next/head'

import { AuthLayout } from '@/components/auth/auth-layout'
import { RegisterForm } from '@/components/auth/register-form'
import { MarketingPanel } from '@/components/marketing/marketing-panel'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Create Account | Highveld Advisory</title>
        <meta
          content="Register for secure access to your Highveld Advisory client portal."
          name="description"
        />
      </Head>
      <AuthLayout form={<RegisterForm />} marketing={<MarketingPanel />} />
    </>
  )
}
