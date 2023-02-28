import { USER_PROFILE } from '@/utils/types/user'
import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { InteractionContext } from '@/components/context/InteractionContext'

export const UserContext = createContext<any>({})

export const UserProvider: React.FC<any> = ({ children }) => {
    const [profile, setProfile] = useState<USER_PROFILE | null>(null)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const router = useRouter()

    const { token } = useContext(InteractionContext)

    useEffect(() => {
        if (router.isReady && token) {
            axios
                .get(`${process.env.NEXT_PUBLIC_API_URL}/user/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setIsLoaded(true)
                    setProfile(res.data.data)
                })
                .catch((err) => {
                    setIsLoaded(true)
                    setProfile(null)
                })
        } else {
            setProfile(null)
        }
    }, [token])

    return (
        <UserContext.Provider
            value={{
                profile,
                setProfile,
                isLoaded,
                setIsLoaded,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
