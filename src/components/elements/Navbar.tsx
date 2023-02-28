import { Avatar, Button, Dropdown, Label, Navbar } from 'flowbite-react'
import { NavbarBrand } from 'flowbite-react/lib/esm/components/Navbar/NavbarBrand'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import HiveIcon from '@mui/icons-material/Hive'
import { UserContext } from '../context/UserContext'

export default function NavigationBar(): JSX.Element {
    const { profile, isLoaded } = useContext(UserContext)
    const router = useRouter()

    return (
        <Navbar className="shadow-lg flex flex-row bg-[#071624]">
            <Link href="/" className=" font-bold">
                <HiveIcon />
                <span className="ml-1 text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-sky-500">
                    {"VEIVEL'S BIRD APP"}
                </span>
            </Link>
            {isLoaded ? (
                profile ? (
                    <Dropdown
                        label={
                            <>
                                <Avatar
                                    rounded={true}
                                    img={profile.avatar}
                                    status="online"
                                />
                                <Label className="mx-4 text-black text-lg">
                                    <b>{profile.username}</b>
                                </Label>
                            </>
                        }
                        arrowIcon={false}
                        inline={true}
                        dismissOnClick={true}
                    >
                        <Dropdown.Header>
                            <b>User: {profile.username}</b>
                        </Dropdown.Header>
                        <Dropdown.Item
                            onClick={() =>
                                router.push(`/profile/user/${profile.username}`)
                            }
                        >
                            View Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => router.push('/profile/edit')}
                        >
                            Edit Profile
                        </Dropdown.Item>
                        <Dropdown.Item
                            className="text-red-500"
                            onClick={() => router.push('/auth/logout')}
                        >
                            Logout
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <div className="flex gap-x-4">
                        <Button onClick={(e) => router.push('/auth/login')}>
                            Login
                        </Button>
                        <Button
                            onClick={(e) => router.push('/auth/register')}
                            outline
                        >
                            Register
                        </Button>
                    </div>
                )
            ) : (
                <>
                    <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                </>
            )}
        </Navbar>
    )
}
