import DreamContent from "./DreamContent";
import DreamResponse from "./DreamResponse";
import { Post } from "./DreamFeed";
type FeedPostProps = Post

const FeedPost = ( props: Post) => {
    return (
        <div className="flex flex-row justify-start p-[1vw] gap-[0.8vw]">
            <DreamContent {...props} />
            <DreamResponse />
        </div>
    )
}

export default FeedPost;