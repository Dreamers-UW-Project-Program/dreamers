import React from "react";
import Image from 'next/image';
import robot from '../../public/images/bot.jpg'


const Bot = () => {
    return (
        <div className="flex h-[25%]">
            <div className="fixed bottom-0 left-[15%] z-[-1000]">
                <Image src={robot} alt="" className="pl-[1vw] w-[15vw] h-[15vw]"/>
            </div>
        </div>
    )
}

export default Bot;