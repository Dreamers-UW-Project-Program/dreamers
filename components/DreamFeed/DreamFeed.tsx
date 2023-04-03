import { useEffect, useState } from "react";
import FeedPost from "./FeedPost";
import { Post } from "@customTypes/globals";
import InfiniteScroll from 'react-infinite-scroller';

const DreamFeed = () => {
    const [posts, setPosts] = useState<{[id: string]: Post}>({});
    const [lastKey, setLastKey] = useState(" ");
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {

        const fetchedPosts: {[id: string]: Post} = await fetch(`/api/posts?startKey=${lastKey}&num=5`, {
            method: "GET",
        }).then(response => {
            if (response.status === 404) {
                return null;
            }
            return response.json();
        });

        if (Object.keys(fetchedPosts).length <= 1) {
            setHasMore(false);
            console.log("Page False");
            return;
        }
        
        setPosts(prevPosts => ({ ...prevPosts, ...fetchedPosts }));
        console.log("Loaded Page");

        console.log("keys", Object.keys(fetchedPosts));
        // console.log("last key:", Object.keys(fetchedPosts)[Object.keys(fetchedPosts).length - 1])
        const key = Object.keys(fetchedPosts)[Object.keys(fetchedPosts).length - 1];
        console.log("key:", key);
        // await setLastKey("no longer empty string mf");
        setLastKey(key);
        console.log("lastKey:", lastKey);
        console.log(Object.keys(posts).length);
    };

    return (
        <div className="flex flex-col white-box-shadow rounded-[2rem] mt-[2vw] w-[80%] bg-transparent border-[1px] border-white z-30">
            <p className="font-semibold text-white font-quicksandBold white-text-shadow text-4xl m-7">Your Friends Dreamed of...</p>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
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
                                    // thumbnail={"https://cdn.discordapp.com/attachments/772859425261748255/1086762019690139729/photo-1524024973431-2ad916746881.jpg"}
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