import { Button, Spinner, Label } from "flowbite-react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../elements/Post";
import PostTweet from "./PostTweet";
import GroupIcon from '@mui/icons-material/Group';
import { POST } from "@/utils/types/content";
import axios from "axios";
import router, { useRouter } from "next/router";
import { useContext } from "react";
import { HOME_FEED, HomeFeedContext } from "../context/HomeFeedContext";
import { InteractionContext } from "../context/InteractionContext";
import { UserContext } from "../context/UserContext";

export default function HomeFeedContainer(): JSX.Element {
    const { posts , setPosts, hasNext, setHasNext, pageNum, setPageNum }: HOME_FEED = useContext(HomeFeedContext)
    const { token } = useContext(InteractionContext);
    const { profile } = useContext(UserContext);
    const router = useRouter();

    async function fetchPosts(page: number) {
        return axios
            .get(`/posts/?page=${pageNum}`, {
                headers: {"Authorization": `Bearer ${token}`}
            })
        .then(res => res.data.data)
        .then(data => {
            if (posts) {
                setPosts((prev) => {
                    if (prev) return [...prev, ...data]
                    else return data
                })
            } else {
                setPosts(data)
            }

            if (data?.length === 0) {
                setHasNext(false)
                throw new Error("No more posts")
            }
            
            return data
        })
        .catch(err => {
            throw err
        })
    }

    if (token && !posts && pageNum === 1) {
        fetchPosts(pageNum)
            .then(data => setPageNum(2))
            .catch(err => {
                router.push("/auth/login")
            })
    }

    function fetchMorePosts() {
        fetchPosts(pageNum + 1)
            .then(data => setPageNum(pageNum + 1))
            .catch(err => console.log("err:", err))
    }

    function onNewPost(data: POST) {
        setPosts((prev) => {
            if (prev) return [data, ...prev]
            else return [data]
        })
    }


    return(
        <>
            <div>
                <div className='flex flex-row-reverse justify-between'>
                    <Button outline><GroupIcon />Edit Close Friends</Button>
                </div>
                <h2 className='mb-4'>Post something to the world!</h2>
                <PostTweet onNewPost={onNewPost}/>
                <h2>Home</h2>
                { posts ?
                    <>
                        {/* <div className='flex flex-col gap-y-4 scrollableDiv' id="scrollableDiv"> */}
                            <InfiniteScroll
                                dataLength={posts.length}
                                next={fetchMorePosts}
                                hasMore={hasNext}
                                loader={
                                    <div className='flex'>
                                        <Spinner className='mx-auto m-4' size={"lg"}/>
                                    </div>
                                }
                                scrollableTarget="scrollableDiv"
                                pullDownToRefresh
                                refreshFunction={fetchMorePosts}
                                endMessage={
                                    <div className='flex'>
                                        <Label className='mx-auto m-4 text-white'>No more posts to see.</Label>
                                    </div>
                                }
                                className="flex flex-col gap-y-4"
                            >
                                {posts.map((post, idx) => (
                                    <Post {...post} 
                                        key={idx} 
                                        index={idx} 
                                        editable={post.author === profile?.username}
                                    />
                                ))}
                            </InfiniteScroll>
                        {/* </div> */}
                    </>
                :
                    <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-16 bg-gray-200 rounded-xl dark:bg-gray-700 w-[40rem] mb-4 mx-4"></div>
                        <div className="h-16 bg-gray-200 rounded-xl dark:bg-gray-700 w-[40rem] mb-4 mx-4"></div>
                        <div className="h-16 bg-gray-200 rounded-xl dark:bg-gray-700 w-[40rem] mb-4 mx-4"></div>
                        <div className="h-16 bg-gray-200 rounded-xl dark:bg-gray-700 w-[40rem] mb-4 mx-4"></div>
                    </div>
                }
            </div>
        </>
    )
}