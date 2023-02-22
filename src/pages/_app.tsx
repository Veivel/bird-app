import { InteractionProvider } from '@/components/context/InteractionContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <InteractionProvider>
                <Toaster />
                <Component {...pageProps} />
            </InteractionProvider>
        </>
    )
}
