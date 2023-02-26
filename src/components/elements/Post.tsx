import { POST } from '@/utils/types/content';
import { Avatar } from 'flowbite-react';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { parseTimeString, parseDateString } from '../../utils/datetime';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import { InteractionContext } from '../context/InteractionContext';
import toast from 'react-hot-toast';
import { HOME_FEED, HomeFeedContext } from '../context/HomeFeedContext';

export default function Post(post: POST): JSX.Element {
    const cfClasses = post.is_close_friends 
        ? "border-4 border-green-500" 
        : "border border-neutral-400 border-opacity-50";

    const [editMode, setEditMode] = useState<boolean>(false);
    const { token } = useContext(InteractionContext);
    const { posts , setPosts, hasNext, setHasNext, pageNum, setPageNum }: HOME_FEED = useContext(HomeFeedContext)

    function toggleEditMode() {
        setEditMode(prev => !prev)
    }

    // todo: more security

    function handleEdit() {
        console.log(post.index)
        if (post.editable) {
            
        }
    }

    function handleDelete() {
        if (post.editable) {
            axios
                .delete(`/posts/${post.uuid}`, {
                    headers: {"Authorization": `Bearer ${token}`}
                })
                .then(res => toast.success(res.data.message))
                .catch(res => toast.error("Could not delete post."))
        }

        if (posts && post.index) {
            setPosts([...posts.slice(0, post.index), ...posts.slice(post.index + 1)])
        }
    }

    return(
        <>
            <div className={`bg-neutral-100 rounded-2xl p-4 shadow-md text-black ${cfClasses}`}>
                <div className='flex flex-row justify-between'>
                    <div className='flex'>
                        <Link href={`/profile/user/${post.author}`}>
                            <Avatar img={post.author_avatar} rounded={true}/>
                        </Link>
                        <div className='px-2'>
                            <Link href={`/profile/user/${post.author}`} className='flex'>
                                <p className='font-bold'>{post.author}</p>
                                {post.is_close_friends ?
                                    <p className='ml-1 text-xs align-bottom my-auto'><i>(close friends)</i></p>
                                : <></> }
                            </Link>
                            <p className='text-xs'>{parseDateString(post.created_at)}, {parseTimeString(post.created_at)}</p>
                        </div>
                    </div>
                    <div className='flex gap-x-4'>
                        { post.editable ? <EditIcon className='cursor-pointer' onClick={toggleEditMode}/> : <></> }
                        { post.editable ? <DeleteForeverIcon color='error' className='cursor-pointer' onClick={handleDelete}/> : <></> }
                    </div>
                </div>
                <p className='p-2'>{post.text}</p>
            </div>
        </>
    )
}