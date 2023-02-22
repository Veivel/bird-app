import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'

// The context & context provider for API interactions (Auth token and axios)

export const InteractionContext = createContext<any>({})

export const InteractionProvider: React.FC<any> = ({ children }) => {
    const router = useRouter()
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
    const [token, setToken] = useState<string>('')

    if (!token && router.isReady) {
        const savedToken = secureLocalStorage.getItem('token')
        console.log('logged in w/ token:', savedToken)

        if (savedToken) {
            setToken(savedToken.toString())
        } else {
            setToken('-')
        }
    }

    return (
        <InteractionContext.Provider
            value={{
                token,
                setToken,
            }}
        >
            {children}
        </InteractionContext.Provider>
    )
}
