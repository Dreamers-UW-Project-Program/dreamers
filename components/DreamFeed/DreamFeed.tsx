import { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import { Post } from "@customTypes/globals";
import InfiniteScroll from 'react-infinite-scroller';

const DreamFeed = () => {
    const [posts, setPosts] = useState<{[id: string]: Post}>({});
    const [page, setPage] = useState<number>(1);

    const loadMore = async (pageNumber: number) => {
        const fetchedPosts = await fetch(`/api/posts?page=${pageNumber}`, {
            method: "GET",
        }).then(response => {
            return response.json();
        });
        setPosts(prevPosts => ({ ...prevPosts, ...fetchedPosts }));
        setPage(pageNumber + 1);
    };
    
    useEffect(() => {
        const getPosts = async () => {
            const fetchedPosts = await fetch(`/api/posts?page=${page}`, {
                method: "GET",
            }).then(response => {
                return response.json();
            } )
            setPosts(fetchedPosts);
            //console.log("posts", posts);
        }
        getPosts();
    }, [page]);

    return (
        <div className="flex flex-col white-box-shadow rounded-[2rem] mt-[2vw] w-[80%] bg-transparent border-2 border-white z-30">
            <p className="font-semibold text-white font-montserratBold text-4xl m-7 border-b-[1vw]">Your Friends Dreamed of......</p>
            <InfiniteScroll
                pageStart={page}
                loadMore={loadMore}
                hasMore={true}
                loader={<div className="loader" key={0}>Loading ...</div>}
                useWindow={true}
            >
                <div className="flex flex-col gap-[1vw]">
                    {Object.keys(posts).map(id => {
                        const args = posts[id]["date"].split(' ');
                        const date = args[0] + ' ' + args[1] + ' ' + args[2] + ', ' + args[3]
                        return <FeedPost 
                                    key={id} 
                                    postID={id}
                                    body={posts[id]["body"]}
                                    title={posts[id]["title"]}
                                    authorID={posts[id]["authorID"]}
                                    date={date}
                                    thumbnail={posts[id]["thumbnail"]}
                                    comments={posts[id]["comments"] ?? {}}
                                    likes={posts[id]["likes"] ?? {}}
                                />
                    })}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default DreamFeed