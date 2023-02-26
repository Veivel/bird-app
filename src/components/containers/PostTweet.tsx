import { Button, Radio, Textarea, TextInput, Checkbox, Label } from 'flowbite-react';
import SendIcon from '@mui/icons-material/Send';
import { BaseSyntheticEvent, useState, useContext } from 'react';
import axios from 'axios';
import { InteractionContext } from '../context/InteractionContext';
import { POST } from '@/utils/types/content';
import toast from 'react-hot-toast';

interface POST_BODY {
    text: string
    is_close_friends: boolean
}

interface POST_TWEET_PROPS {
    onNewPost: ((data: POST) => any)
}

export default function PostTweet({ onNewPost }: POST_TWEET_PROPS):JSX.Element {
    const [data, setData] = useState<POST_BODY>({text: "", is_close_friends: false})
    const { token } = useContext(InteractionContext);

    function handleFormSubmit(e: BaseSyntheticEvent) {
        e.preventDefault();

        axios
            .post("/posts/", {
                text: data.text,
                is_close_friends: data.is_close_friends,
            }, {
                headers: {"Authorization": `Bearer ${token}`}
            })
            .then(res => onNewPost(res.data.data))
            .catch(err => toast.error("Could not submit post."))
    }

    function handleFormChange(e: BaseSyntheticEvent) {
        e.preventDefault();
        if (e.target.name === 'text') {
            setData({...data, text: e.target.value})
        } else {
            setData({...data, is_close_friends: !data.is_close_friends})
        }
    }

    return(
        <>
            <div>
                <form onSubmit={handleFormSubmit} className="flex flex-col">
                    <Textarea 
                        name="text"
                        placeholder="Type something here..." 
                        rows={4} 
                        cols={10}
                        value={data.text}
                        onChange={handleFormChange}
                    />
                    <div className="flex flex-row-reverse justify-around p-2">
                        <Button className="my-auto" role={"submit"} type="submit">
                            <p className="mr-1">Post</p>
                            <SendIcon className="h-[20px]"/>
                        </Button>
                        <div className='my-auto'>
                            <Checkbox 
                                id="is_close_friends" 
                                checked={data.is_close_friends}
                                onChange={handleFormChange}
                            /> 
                            <Label color={"black"}>For Close Friends only?</Label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}