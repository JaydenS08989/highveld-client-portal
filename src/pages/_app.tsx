import '@/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { store } from '@/store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} appearance={{ cssLayerName: 'clerk' }}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ClerkProvider>
  )
}
