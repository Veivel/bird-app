export interface POST {
    index?: number
    uuid: string
    text: string
    author: string
    author_avatar: string
    is_close_friends: boolean
    created_at: string
    likes: number
    comments: COMMENT[]
    is_edited?: boolean // todo
    editable?: boolean
}

export interface COMMENT {
    text: string
    author: string
    author_avatar: string
    created_at: string
}
