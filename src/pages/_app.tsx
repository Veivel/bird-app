import { HomeFeedProvider } from '@/components/context/HomeFeedContext'
import { InteractionProvider } from '@/components/context/InteractionContext'
import { UserProvider } from '@/components/context/UserContext'
import FooterBar from '@/components/elements/Footer'
import NavigationBar from '@/components/elements/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <InteractionProvider>
                <UserProvider>
                    <HomeFeedProvider>
                        <NavigationBar />
                        <main className="min-h-[75vh]">
                            <Toaster />
                            <Component {...pageProps} />
                        </main>
                        <FooterBar />
                    </HomeFeedProvider>
                </UserProvider>
            </InteractionProvider>
        </>
    )
}
