import React from "react";
import Image from 'next/image';


const Bot = () => {
    return (
        <div className="flex h-[25%]">
            <div className="fixed bottom-0 left-[15%] z-1">
                <Image src="/images/bot.png" alt="" width={600} height={200}/>
            </div>
        </div>
    )
}

export default Bot;