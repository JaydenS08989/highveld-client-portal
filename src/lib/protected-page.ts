import { buildClerkProps, getAuth } from '@clerk/nextjs/server'
import type { GetServerSideProps } from 'next'

export const getProtectedPageProps: GetServerSideProps = async ({ req }) => {
  const { isAuthenticated } = getAuth(req)

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...buildClerkProps(req),
    },
  }
}
