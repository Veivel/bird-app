import axios from 'axios'
import { Button, Checkbox, Label, Radio, TextInput } from 'flowbite-react'
import { BaseSyntheticEvent, FormEvent, useState, useContext } from 'react'
import { toast } from 'react-hot-toast'
import { InteractionContext } from '../../components/context/InteractionContext'
import secureLocalStorage from 'react-secure-storage'

export default function LoginPage(): JSX.Element {
    function handleFormSubmit(e: BaseSyntheticEvent) {
        e.preventDefault()
        console.log(axios.defaults.baseURL)
        axios
            .post('/auth/register', {
                username: e.target.username.value,
                password: e.target.password.value,
                // ...
            })
            .then((res) => res.data)
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

    return (
        <>
            <main>
                <h1>Sign Up</h1>
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
                    {/* ... */}
                    <Checkbox id="remember_me" />
                    <Label htmlFor="remember_me">Remember Me</Label>
                    <Button type="submit">Submit</Button>
                    <Button type="button" outline={true}>
                        Sign Up with Google
                    </Button>
                </form>
            </main>
        </>
    )
}
