import DreamContent from "./DreamContent";
import DreamResponse from "./DreamResponse";

const FeedPost = () => {
    return (
        <div className="flex flex-row justify-start p-[1vw] flex-1 gap-[0.8vw]">
            <DreamContent />
            <DreamResponse />
        </div>
    )
}

export default FeedPost;