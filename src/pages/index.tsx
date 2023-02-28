import Head from 'next/head'
import Image from 'next/image'
import {
    HomeFeedContext,
    HOME_FEED,
    HomeFeedProvider,
} from '../components/context/HomeFeedContext'
import HomeFeedContainer from '@/components/containers/HomeFeedContainer'

export default function Home() {
    return (
        <>
            <Head>
                <title>{"Veivel's Bird App"}</title>
                <meta
                    name="description"
                    content="A basic social media app, featuring text posts! woo"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <HomeFeedProvider>
                    <HomeFeedContainer />
                </HomeFeedProvider>
            </main>
        </>
    )
}
