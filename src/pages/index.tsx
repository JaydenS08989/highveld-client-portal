import Head from 'next/head'

import { AuthLayout } from '@/components/auth/auth-layout'
import { LoginForm } from '@/components/auth/login-form'
import { MarketingPanel } from '@/components/marketing/marketing-panel'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Highveld Client Portal</title>
        <meta
          content="Secure client access for documents, requests, and account services."
          name="description"
        />
      </Head>
      <AuthLayout form={<LoginForm />} marketing={<MarketingPanel />} />
    </>
  )
}
