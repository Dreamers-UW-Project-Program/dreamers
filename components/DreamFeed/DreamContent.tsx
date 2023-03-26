import { Post } from "./DreamFeed";

const DreamContent = ( props: Post ) => {
    return (
        <div className="basis-2/3 flex flex-col gap-y-2 text-white border-[0.5vw] p-[0.3vw] rounded-r-3xl font-serif">
            <div className="flex justify-between">
                <div>{props.title}</div>
                <div>{props.date}</div>
            </div>
            <img src={props.thumbnail} />
            {props.body}
        </div>
    )
}

export default DreamContent;