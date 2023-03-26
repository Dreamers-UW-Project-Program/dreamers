import Feed from "./Feed";

const DreamFeed = () => {
    return (
        <div className="rounded-[2rem] mt-[4vw] w-[80%] h-[100vw] bg-transparent border-2 border-white z-30">
            <p className="font-semibold text-white font-serif text-2xl m-7 border-b-[1vw]">Your Friends Dreamed of......</p>
            <div className="flex flex-col gap-[1vw]">
                <Feed />
                <Feed />
                <Feed />
                <Feed />
            </div>
        </div>
    );
}

export default DreamFeed