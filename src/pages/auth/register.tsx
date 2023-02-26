import axios from 'axios'
import { Button, Checkbox, Label, Radio, TextInput } from 'flowbite-react'
import { BaseSyntheticEvent, FormEvent, useState, useContext } from 'react'
import { toast } from 'react-hot-toast'
import { InteractionContext } from '../../components/context/InteractionContext'
import secureLocalStorage from 'react-secure-storage'
import { USER_AUTH } from '../../utils/types/user';
import { useRouter } from 'next/router';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link'

export default function LoginPage(): JSX.Element {
    const router = useRouter()

    async function handleFormSubmit(e: BaseSyntheticEvent) {
        e.preventDefault()
        const userpromise = registerUser({
            username: e.target.username.value,
            password: e.target.password.value,
            email: e.target.email.value,
        })

        toast.promise(userpromise, {
            loading: 'Registering user...',
            success: 'Successfully registered user. You may now login.',
            error: 'Error registering user.',
         })
    }

    async function registerUser(body: USER_AUTH) {
        return axios
            .post('/auth/register', body)
            .then((res) => res.data)
            .catch((err) => {
                throw err
            })
    }

    function handleGoogleAuth(e: BaseSyntheticEvent) {
        router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/oauth2/google`)
    }

    return (
        <>
            <main>
                <h1>Sign Up</h1>
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-2">
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="E-mail address"
                        required={true}
                    />
                    <TextInput
                        id="username"
                        type="text"
                        placeholder="Username"
                        required={true}
                    />
                    <TextInput
                        id="password"
                        type="password"
                        placeholder="Password"
                        required={true}
                    />
                    <div className='flex w-full my-4'>
                        <Button type="submit" className='w-full'>Submit</Button>
                    </div>
                    <div className='text-center mx-auto my-8'>
                        <Label color={"black"}>OR:</Label>
                        <Button className="mx-auto" type="button" outline={true} onClick={handleGoogleAuth}>
                            <GoogleIcon className='h-[20px]'/> <span className='ml-1'>Sign Up with Google</span>
                        </Button>
                    </div>
                </form>
            </main>
        </>
    )
}
