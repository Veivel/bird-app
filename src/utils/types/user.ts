
export interface USER_PROFILE {
    username: string
    email: string
    avatar: string
    created_at: string
}

export interface USER {
    username: string
    email: string
    avatar: string
    created_at: string
    close_friends: string[]
    password: string
}

export interface USER_AUTH {
    username: string
    email: string
    remember_me: boolean
}