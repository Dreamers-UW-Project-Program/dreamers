import React from "react";
import Image from 'next/image';
import robot from '../../public/images/bot.png'


const Bot = () => {
    return (
        <Image src={robot} alt="" className="fixed bottom-0 translate-y-8 left-3 z-1 w-[13vw] h-[20vw]"/>
    )
}

export default Bot;