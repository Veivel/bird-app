import { POST } from '@/utils/types/content'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { USER_PROFILE } from '../../../utils/types/user'
import { InteractionContext } from '../../../components/context/InteractionContext'
import Post from '@/components/elements/Post'
import UserProfile from '@/components/containers/UserProfile'
import {
    HomeFeedContext,
    HOME_FEED,
} from '@/components/context/HomeFeedContext'
import { UserContext } from '@/components/context/UserContext'

export const revalidate = 0

export default function PublicProfilePage(): JSX.Element {
    const router = useRouter()
    const { token } = useContext(InteractionContext)
    const [targetProfile, setTargetProfile] = useState<USER_PROFILE | null>(
        null,
    )
    const [posts, setPosts] = useState<POST[] | null>(null)
    // const { posts , setPosts }: HOME_FEED = useContext(HomeFeedContext)
    const { profile } = useContext(UserContext)

    if (router.isReady && !targetProfile) {
        const { username } = router.query
        fetchUser(String(username)).then(fetchPosts)
    }

    async function fetchUser(username: string): Promise<string> {
        return axios
            .get(`/user/${username}`)
            .then((res) => {
                setTargetProfile(res.data.data)
                return res.data.data.username
            })
            .catch((err) => {
                router.push('/profile/404')
                return ''
            })
    }

    async function fetchPosts(username: string) {
        if (username === '') return

        axios
            .get(`/user/${username}/posts`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => res.data.data)
            .then((data) => {
                if (data) setPosts(data)
                else setPosts([])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div>
                <div className="flex">
                    {targetProfile ? (
                        <UserProfile {...targetProfile} />
                    ) : (
                        <UserProfile
                            username={''}
                            email={''}
                            avatar={''}
                            created_at={''}
                        />
                    )}
                </div>
                <div>
                    <h1>Posts</h1>
                    {posts ? (
                        <div className="flex flex-col-reverse gap-y-4">
                            {posts.map((post, idx) => (
                                <Post
                                    {...post}
                                    key={idx}
                                    index={idx}
                                    editable={post.author === profile?.username}
                                />
                            ))}
                            {posts.length === 0 ? (
                                <p>This user has no posts yet.</p>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (
                        <div role="status" className="max-w-sm animate-pulse">
                            <div className="h-16 bg-gray-200 rounded-xl dark:bg-gray-700 w-[40rem] mb-4 mx-4"></div>
                            <div className="h-16 bg-gray-200 rounded-xl dark:bg-gray-700 w-[40rem] mb-4 mx-4"></div>
                            <div className="h-16 bg-gray-200 rounded-xl dark:bg-gray-700 w-[40rem] mb-4 mx-4"></div>
                            <div className="h-16 bg-gray-200 rounded-xl dark:bg-gray-700 w-[40rem] mb-4 mx-4"></div>
                        </div>
                    )}
                    <div className="h-[120px]"></div>
                </div>
            </div>
        </>
    )
}
