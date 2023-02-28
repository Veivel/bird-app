import { parseDateString } from '@/utils/datetime'
import { Avatar } from 'flowbite-react'
import Link from 'next/link'
import { USER_PROFILE } from '../../utils/types/user'
export default function UserProfile(
    profile: USER_PROFILE | undefined,
): JSX.Element {
    return (
        <>
            <div className="flex text-white">
                <Avatar img={profile?.avatar} rounded={true} size="lg" />
                {profile?.username ? (
                    <div className="flex flex-col px-4">
                        <h2>{profile?.username}</h2>
                        <p>
                            Member since {parseDateString(profile.created_at)}
                        </p>
                    </div>
                ) : (
                    <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-4 mx-4"></div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 mx-4"></div>
                    </div>
                )}
            </div>
        </>
    )
}
