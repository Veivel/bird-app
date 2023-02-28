import { POST } from '@/utils/types/content'
import { Avatar, Button, Label, TextInput } from 'flowbite-react'
import Link from 'next/link'
import { useState, useContext, BaseSyntheticEvent } from 'react'
import { parseTimeString, parseDateString } from '../../utils/datetime'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import axios from 'axios'
import { InteractionContext } from '../context/InteractionContext'
import toast from 'react-hot-toast'
import { HOME_FEED, HomeFeedContext } from '../context/HomeFeedContext'
import { COMMENT } from '../../utils/types/content'

export default function Post(post: POST): JSX.Element {
    const cfClasses = post.is_close_friends
        ? 'border-4 border-green-500'
        : 'border border-neutral-400 border-opacity-50'

    const [editMode, setEditMode] = useState<boolean>(false)
    const [comments, setComments] = useState<COMMENT[] | null>(null)

    const { token } = useContext(InteractionContext)
    const { posts, setPosts }: HOME_FEED = useContext(HomeFeedContext)

    function toggleEditMode() {
        setEditMode((prev) => !prev)
    }

    // todo: more security
    function handleEdit() {
        console.log(post.index)
        if (post.editable) {
        }
    }

    function handleCommentSubmit(e: BaseSyntheticEvent) {
        e.preventDefault()
        if (
            e.target.commentText.value.length <= 0 ||
            e.target.commentText.value.length > 128
        ) {
            toast.error('Invalid comment content!')
        }

        axios
            .post(
                `/posts/${post.uuid}/comments`,
                {
                    text: e.target.commentText.value,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            .then((res) => res.data.data)
            .then((data) =>
                setComments((prev) => (prev ? [...prev, data] : [data])),
            )
            .catch((err) => console.log(err))
    }

    function handleDelete() {
        if (post.editable) {
            axios
                .delete(`/posts/${post.uuid}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => toast.success(res.data.message))
                .catch((res) => toast.error('Could not delete post.'))
        }

        if (posts && post.index) {
            setPosts([
                ...posts.slice(0, post.index),
                ...posts.slice(post.index + 1),
            ])
        }
    }

    function fetchComments() {
        setComments(post.comments)
        // axios
        //     .get(`/posts/${post.uuid}/comments`, {
        //         headers: {"Authorization": `Bearer ${token}`}
        //     })
        //     .then(res => res.data.data)
        //     .then(data => setComments(data))
        //     .catch(err => console.log(err))
    }

    return (
        <div
            className={`bg-neutral-100 rounded-2xl shadow-md text-black ${cfClasses}`}
        >
            <div className={`p-4`}>
                <div className="flex flex-row justify-between">
                    <div className="flex">
                        <Link href={`/profile/user/${post.author}`}>
                            <Avatar img={post.author_avatar} rounded={true} />
                        </Link>
                        <div className="px-2">
                            <Link
                                href={`/profile/user/${post.author}`}
                                className="flex flex-col md:flex-row "
                            >
                                <p className="font-bold">{post.author}</p>
                                {post.is_close_friends ? (
                                    <p className="md:ml-1 text-xs align-bottom my-auto">
                                        <i>(close friends)</i>
                                    </p>
                                ) : (
                                    <></>
                                )}
                            </Link>
                            <p className="text-xs">
                                {parseDateString(post.created_at)},{' '}
                                {parseTimeString(post.created_at)}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-x-4">
                        {/* { post.editable ? <EditIcon className='cursor-pointer' onClick={toggleEditMode}/> : <></> } */}
                        {post.editable ? (
                            <DeleteForeverIcon
                                color="error"
                                className="cursor-pointer"
                                onClick={handleDelete}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <p className="p-2">{post.text}</p>
            </div>
            {/* COMMENTS */}
            {!comments ? (
                <button
                    className={`w-full p-2 border border-t-neutral-300 rounded-b-2xl`}
                    onClick={(e) => fetchComments()}
                >
                    <Label className="cursor-pointer">See comments...</Label>
                </button>
            ) : (
                <div className="border-t border-t-neutral-300 pt-2">
                    {comments.map((comment, i) => (
                        <div key={i} className="px-4 text-sm flex">
                            <p className="font-bold">{comment.author}</p>
                            <p>
                                {': '}
                                {comment.text}
                            </p>
                        </div>
                    ))}
                    <form
                        className="p-2 flex w-full gap-x-2"
                        onSubmit={handleCommentSubmit}
                    >
                        <TextInput
                            id="commentText"
                            name="commentText"
                            placeholder="Add a comment..."
                            className="w-full"
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            )}
        </div>
    )
}
