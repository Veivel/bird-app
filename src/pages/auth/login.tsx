import axios from 'axios'
import {
    Button,
    Checkbox,
    Label,
    Radio,
    TextInput,
    Toast,
} from 'flowbite-react'
import { BaseSyntheticEvent, FormEvent, useState, useContext } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { InteractionContext } from '../../components/context/InteractionContext'
import secureLocalStorage from 'react-secure-storage'
import { useRouter } from 'next/router';
import GoogleIcon from '@mui/icons-material/Google';
import Link from 'next/link'
import { USER_AUTH } from '../../utils/types/user';

export default function LoginPage(): JSX.Element {
    const router = useRouter();
    const { setToken } = useContext(InteractionContext)

    function handleFormSubmit(e: BaseSyntheticEvent) {
        e.preventDefault()
        const userpromise = signUser({
            username: e.target.username.value,
            password: e.target.password.value,
            remember_me: e.target.remember_me.checked,
        });

        toast.promise(userpromise, {
            loading: "Logging you in...",
            success: "Succesfully logged in",
            error: (err) => err.response.data.message,
        })
    }

    async function signUser(body: USER_AUTH) {
        return axios
            .post('/auth/login', body)
            .then((res) => res.data)
            .then((data) => {
                setToken(data.token)
                secureLocalStorage.setItem('token', data.token)
            })
            .catch((err) => {
                throw err
            })
    } 

    function handleGoogleOAuth(e : BaseSyntheticEvent) {
        e.preventDefault();

        router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/oauth2/google`)
    }

    return (
        <>
            <main>
                <h1>Login</h1>
                <Label color={"black"}>You need to login before viewing content on the site!</Label>
                {/* Handling forms the old fashioned way (no states) */}
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-2">
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
                    <div>
                        <Checkbox id="remember_me" />
                        <Label htmlFor="remember_me" color={"black"}>Remember Me</Label>
                    </div>
                    <div className='flex w-full my-8'>
                        <Button type="submit" className='w-full'>Submit</Button>
                    </div>
                    <div className='text-center mx-auto my-8'>
                        <Label color={"black"}>OR: </Label>
                        <Button type="button" outline={true} onClick={handleGoogleOAuth} className='mx-auto'>
                            <GoogleIcon />Login with Google
                        </Button>
                    </div>
                </form>
            </main>
        </>
    )
}
