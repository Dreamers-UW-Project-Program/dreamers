import DreamContent from "./DreamContent";
import DreamResponse from "./DreamResponse";
import { Post } from "@customTypes/globals";
import { useState } from "react";

const FeedPost = (props: Post) => {
    const [likes, setLikes] = useState(props.likes);
    const [comments, setComments] = useState(props.comments);
    return (
        <div className="flex flex-row justify-start p-[1vw] gap-[0.8vw]">
            <DreamContent setLikes={setLikes} setComments={setComments} {...props} comments={comments} likes={likes} />
            
        </div>
    )
}

export default FeedPost;