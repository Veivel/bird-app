import axios from 'axios'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'

// The context & context provider for API interactions (Auth JWT token and Axios defaults)

export const InteractionContext = createContext<any>({})

export const InteractionProvider: React.FC<any> = ({ children }) => {
    const router = useRouter()
    const [token, setToken] = useState<string>('')

    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
    // axios.defaults.headers["Cache-Control"] = "no-cache";

    if (!token && router.isReady) {
        const savedToken = secureLocalStorage.getItem('token')

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
