import { Button, Modal, TextInput } from 'flowbite-react'
import { useContext, useState, BaseSyntheticEvent } from 'react'
import axios from 'axios'
import { InteractionContext } from '../context/InteractionContext'
import AddIcon from '@mui/icons-material/Add'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import toast from 'react-hot-toast'

interface CF_MODAL_PROPS {
    show: boolean
    onClose: () => void
}

export default function CloseFriendsModal({
    show,
    onClose,
}: CF_MODAL_PROPS): JSX.Element {
    const [closeFriends, setCloseFriends] = useState<string[] | null>(null)
    const [textInput, setTextInput] = useState<string>('')
    const { token } = useContext(InteractionContext)

    if (token && !closeFriends) fetchCloseFriends()

    async function fetchCloseFriends() {
        return axios
            .get('/user/close-friends/', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => res.data.data)
            .then((data) => {
                if (!data) {
                    setCloseFriends([])
                } else {
                    setCloseFriends(data)
                }
            })
            .catch((err) => console.log(err))
    }

    async function postCloseFriends() {
        return axios
            .post(
                '/user/close-friends/',
                {
                    close_friends: closeFriends,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            )
            .then((res) => res)
            .catch((err) => {
                throw err
            })
    }

    function handleCFAdd(e: BaseSyntheticEvent) {
        setCloseFriends((prev) => (prev ? [...prev, textInput] : [textInput]))
        setTextInput('')
    }

    function handleCFRemove(i: number) {
        setCloseFriends((prev) => {
            return prev ? [...prev.slice(0, i), ...prev.slice(i + 1)] : []
        })
    }

    function handleFormSubmit(e: BaseSyntheticEvent) {
        const cfPromise = postCloseFriends()

        toast.promise(cfPromise, {
            loading: 'Updating your close friends...',
            success: 'Updated your close friends!',
            error: 'Could not update your close friends.',
        })

        cfPromise.then(onClose)
        setTextInput('')
    }

    function handleClose() {
        fetchCloseFriends() // reset
        onClose() // props
    }

    return (
        <>
            <Modal show={show} dismissible={true} onClose={handleClose}>
                <Modal.Header>Edit your Close Friends list!</Modal.Header>
                <Modal.Body>
                    <div className="text-black">
                        <p>
                            You currently have <b>{closeFriends?.length}</b>{' '}
                            close friends:
                        </p>
                        <div className="flex gap-x-1 mb-4">
                            {closeFriends?.map((username, i) => (
                                <div
                                    key={i}
                                    className="py-2 px-6 bg-neutral-200 rounded-full flex"
                                >
                                    <p className="mr-1">{username}</p>
                                    <button onClick={(e) => handleCFRemove(i)}>
                                        <RemoveCircleOutlineIcon
                                            className="h-[20px] w-[20px]"
                                            color="error"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <form className="flex flex-row gap-x-4">
                            <TextInput
                                name="username"
                                placeholder="Enter a user to add as a close friend..."
                                value={textInput}
                                className="w-[75%]"
                                onChange={(e) => setTextInput(e.target.value)}
                            />
                            <Button
                                onClick={handleCFAdd}
                                role="button"
                                type="button"
                                pill
                            >
                                <AddIcon className="h-[20px] w-[20px]" />
                            </Button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex flex-row-reverse">
                    <Button onClick={handleFormSubmit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
