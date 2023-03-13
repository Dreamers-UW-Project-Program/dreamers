import React from "react";
import Image from 'next/image';


const Bot = () => {
    return (
        <div className="fixed bottom-0 z-0">
            <Image src="/images/bot_vertical.png" alt="" width={450} height={800}/>
        </div>
    )
}

export default Bot;