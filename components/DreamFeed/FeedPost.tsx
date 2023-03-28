import DreamContent from "./DreamContent";
import DreamResponse from "./DreamResponse";
import { Post } from "@customTypes/globals";

const FeedPost = (props: Post) => {
    return (
        <div className="flex flex-row justify-start p-[1vw] gap-[0.8vw]">
            <DreamContent {...props} />
            <DreamResponse comments={props.comments} likes={props.likes}/>
        </div>
    )
}

export default FeedPost;