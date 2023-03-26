import Image from 'next/image';
import Discord from '../../public/svg/discord.svg'
import Twitch from '../../public/svg/twitch.svg'
import Twitter from '../../public/svg/twitter.svg'
import Youtube from '../../public/svg/youtube.svg'

function Icons() {
    return (
        <div className="flex flex-row justify-end absolute bottom-0 right-0">
            <a className="icon-shadow">
                <Image src={Discord} alt="discord" className="filter-white w-[1.75vw] h-[1.65vw] mx-[0.75vw] icon hover:translate-y-[-0.25vh]"/>
            </a>
            <a className="icon-shadow">
                <Image src={Twitch} alt="discord" className="filter-white w-[1.75vw] h-[1.65vw] mx-[0.75vw] icon hover:translate-y-[-0.25vh]"/>
            </a>
            <a className="icon-shadow">
                <Image src={Twitter} alt="discord" className="filter-white w-[1.75vw] h-[1.65vw] mx-[0.75vw] icon hover:translate-y-[-0.25vh]"/>
            </a>
            <a className="icon-shadow">
                <Image src={Youtube} alt="discord" className="filter-white w-[1.75vw] h-[1.65vw] mx-[0.55vw] icon hover:translate-y-[-0.25vh]"/>
            </a>
        </div>
    );
}

export default Icons;