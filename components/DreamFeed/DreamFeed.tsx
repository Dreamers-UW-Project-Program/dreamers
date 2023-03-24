function DreamFeed() {
    return (
        <div className="rounded-[2rem] mt-[4vw] w-[45vw] h-[100vw] bg-[black] z-30">
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

function Feed() {
    return (
        <div className="flex flex-row justify-start p-[1vw] flex-1 gap-[0.8vw]">
            <DreamContent />
            <DreamResponse />
        </div>
    )
}

function DreamContent(){
    return (
        <p className="text-white border-[0.5vw] p-[0.3vw] rounded-r-3xl font-serif">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum sequi sit eligendi omnis similique eum unde quisquam possimus tenetur blanditiis odit autem reprehenderit aut architecto ad iure culpa excepturi, ratione soluta nemo facere officia. Fuga saepe exercitationem ut ipsum sequi sed eligendi aut. Sint totam iure sit corrupti incidunt, aliquid iste rerum qui accusantium quas ratione dolor eaque adipisci et quia dicta exercitationem dolores laboriosam optio nostrum! Quisquam ab inventore laboriosam doloribus, sed minima perferendis sint quis quod, facere asperiores aut dicta tenetur reiciendis facilis, dolore in alias quia neque quos nulla non quae molestiae? Maxime dolore iusto ratione facilis.</p>
    )
}

function DreamResponse(){
    return (
        <div className="flex flex-col border-[0.3vw] rounded-lg w-[100vw] p-[0.1vw]">
            <div className="h-[5vw]">
                <p className="border-b-[0.1vw] border-orange-500">💖</p>
                <p className="text-white">[List of liked users]</p>
            </div>
            <div>
                <p className="border-b-[0.1vw] border-orange-500">💬</p>
            </div>
        </div>
    )
}
export default DreamFeed