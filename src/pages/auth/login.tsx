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

export default function LoginPage(): JSX.Element {
    const { setToken } = useContext(InteractionContext)

    function handleFormSubmit(e: BaseSyntheticEvent) {
        e.preventDefault()
        axios
            .post('/auth/login', {
                username: e.target.username.value,
                password: e.target.password.value,
                remember_me: e.target.remember_me.value === 'on' ? true : false,
            })
            .then((res) => res.data)
            .then((data) => {
                toast.success(data.message)
                setToken(data.token)
                secureLocalStorage.setItem('token', data.token)
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <main>
                <h1>Login</h1>
                {/* Handling forms the old fashioned way (no states) */}
                <form onSubmit={handleFormSubmit}>
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
                    <Checkbox id="remember_me" />
                    <Label htmlFor="remember_me">Remember Me</Label>
                    <Button type="submit">Submit</Button>
                    <Button type="button" outline={true}>
                        Login with Google
                    </Button>
                </form>
            </main>
        </>
    )
}
