import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { toast } from 'react-hot-toast'
import secureLocalStorage from 'react-secure-storage'
import { InteractionContext } from '../../../components/context/InteractionContext'

async function fetchToken(queryString: string) {
    return axios
        .get(`/auth/oauth2/callback?provider=google&${queryString}`, {
            withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => {
            throw err
        })
}

export default function CallBackPage() {
    const router = useRouter()
    const { token, setToken } = useContext(InteractionContext)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        let queryString = router.asPath.split('?')[1]
        queryString = queryString.concat('&access_type=offline')
        const tokenPromise = fetchToken(queryString)

        tokenPromise
            .then((data: any) => {
                setToken(data.raw.IDToken)
                secureLocalStorage.setItem('token', data.raw.IDToken)

                console.log(data)
                setLoggedIn(true)
                toast.success(
                    'Successfully logged in. You will be redirected soon.',
                )
            })
            .catch((err: Error) => {
                console.log(err)
            })
    }, [router])

    useEffect(() => {
        if (loggedIn) {
            setTimeout(() => {
                router.push('/')
            }, 2500)
        }
    }, [loggedIn])

    return (
        <div className="text-center">
            {loggedIn ? (
                <>
                    <h1>Successfully logged in!</h1>
                    <p>You will be redirected soon.</p>
                </>
            ) : (
                <>
                    <h1>Logging you in...</h1>
                    <p>Please wait...</p>
                </>
            )}
        </div>
    )
}
