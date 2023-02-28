import { USER_PROFILE } from '@/utils/types/user'
import axios, { AxiosHeaders } from 'axios'
import { useContext, useState, BaseSyntheticEvent } from 'react'
import UserProfile from '../../components/containers/UserProfile'
import { useRouter } from 'next/router'
import { InteractionContext } from '@/components/context/InteractionContext'
import { Button, FileInput, Label } from 'flowbite-react'
import { toast } from 'react-hot-toast'

export const fetchCache = 'none',
    revalidate = 0

export default function EditProfilePage(): JSX.Element {
    const router = useRouter()
    const [profile, setProfile] = useState<USER_PROFILE | null>(null)
    const [avatar, setAvatar] = useState<File | null>(null)
    const { token } = useContext(InteractionContext)

    if (router.isReady && !profile && token) {
        fetchUser()
    }

    async function fetchUser() {
        axios
            .get(`/user/`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setProfile(res.data.data)
                console.log(res)
            })
            .catch((err) => console.log(err))
    }

    function handleAvatarChange(e: BaseSyntheticEvent) {
        e.preventDefault()
        if (e.target.files) {
            setAvatar(e.target.files[0])
        }
    }

    async function submitAvatar(form: FormData, axiosConfig: any) {
        return axios
            .post(`/user/`, form, axiosConfig)
            .then((res) => {
                return res.data
            })
            .catch((err) => console.log(err))
    }

    function handleAvatarSubmit(e: BaseSyntheticEvent) {
        let form = new FormData()
        if (avatar) {
            form.append('avatar', avatar)
            const axiosConfig = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            }

            const avapromise = submitAvatar(form, axiosConfig)
            toast.promise(avapromise, {
                loading: 'Uploading...',
                success: 'Successfully uploaded avatar.',
                error: 'Error uploading avatar.',
            })
        } else {
            toast.error('Please upload an image first.')
        }
    }

    return (
        <>
            <div className="mx-auto">
                <h1>Edit Profile</h1>
                {profile ? (
                    <UserProfile {...profile} />
                ) : (
                    <UserProfile
                        username={''}
                        email={''}
                        avatar={''}
                        created_at={''}
                    />
                )}
                <form
                    encType="multipart/form-data"
                    className="py-8 flex flex-col gap-4"
                >
                    <Label htmlFor="avatar" color={'black'}>
                        Upload a new profile picture:
                    </Label>
                    <div className="flex">
                        <FileInput
                            id="avatar"
                            name="avatar"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleAvatarChange}
                        />
                        <div className="mx-4">
                            <Button
                                role={'button'}
                                onClick={handleAvatarSubmit}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                    <Label color={'black'}>
                        {
                            "Due to ImageKit's caching, changes will not reflect on existing posts."
                        }
                    </Label>
                </form>
            </div>
        </>
    )
}
