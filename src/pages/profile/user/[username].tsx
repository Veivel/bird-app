import axios from 'axios';
import { Avatar } from 'flowbite-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { USER_PROFILE } from '../../../utils/types/user';

export default function PublicProfilePage():JSX.Element {
    const router = useRouter();
    const [profile, setProfile] = useState<USER_PROFILE | null>(null);

    if (router.isReady && !profile) {
        const { username } = router.query
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/user/${username}`)
            .then(res => {
                setProfile(res.data.data)
            })
            .catch(err => router.push("/profile/404"))
    }

    return(
        <>
            <div>
                <h1>Profile</h1>
                <br/>
                <div className='flex'>
                    <Avatar img={profile?.avatar} rounded={true} size="lg"/>
                    <div className='my-auto mx-3'>
                        <h2>{profile?.username}</h2>
                        <p>Member since {profile ? new Date(profile.created_at).toLocaleDateString(): ""}</p>
                    </div>
                </div>
                <div>
                    <h1>Posts</h1>
                </div>
            </div>
        </>
    )
}