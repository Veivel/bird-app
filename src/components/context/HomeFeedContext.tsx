import { USER_PROFILE } from '@/utils/types/user'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react'
import { InteractionContext } from '@/components/context/InteractionContext'
import { POST } from '@/utils/types/content'

export interface HOME_FEED {
    posts: POST[] | null
    setPosts: Dispatch<SetStateAction<POST[] | null>>
    hasNext: boolean
    setHasNext: Dispatch<SetStateAction<boolean>>
    pageNum: number
    setPageNum: Dispatch<SetStateAction<number>>
}

export const HomeFeedContext = createContext<any>({})

export const HomeFeedProvider: React.FC<any> = ({ children }) => {
    const [posts, setPosts] = useState<POST[] | null>(null)
    const [hasNext, setHasNext] = useState<boolean>(true)
    const [pageNum, setPageNum] = useState<number>(1)

    return (
        <HomeFeedContext.Provider
            value={{
                posts,
                setPosts,
                hasNext,
                setHasNext,
                pageNum,
                setPageNum,
            }}
        >
            {children}
        </HomeFeedContext.Provider>
    )
}
