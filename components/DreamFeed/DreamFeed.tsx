import { useEffect, useState } from "react";
import FeedPost from "./FeedPost";

export interface Post {
    authorID: string;
    body: string;
    date: string;
    thumbnail: string;
    title: string;
}

const DreamFeed = () => {
    const [posts, setPosts] = useState<{[id: string]: Post}>({});

    useEffect(() => {
        const getPosts = async () => {
            const fetchedPosts = await fetch("/api/posts", {
                method: "GET",
            }).then(response => {
                return response.json();
            } )
            setPosts(fetchedPosts);
            //console.log("posts", posts);
        }
        getPosts();
    }, [])

    return (
        <div className="rounded-[2rem] mt-[4vw] w-[80%] h-[100vw] bg-transparent border-2 border-white z-30">
            <p className="font-semibold text-white font-serif text-2xl m-7 border-b-[1vw]">Your Friends Dreamed of......</p>
            <div className="flex flex-col gap-[1vw]">
                {Object.keys(posts).map(id => {
                    return <FeedPost 
                                key={id} 
                                body={posts[id]["body"]}
                                title={posts[id]["title"]}
                                authorID={posts[id]["authorID"]}
                                date={posts[id]["date"]}
                                thumbnail={posts[id]["thumbnail"]}
                            />
                })}
            </div>
        </div>
    );
}

export default DreamFeed