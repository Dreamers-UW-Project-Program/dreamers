import Icons from "./Icons";
import Image from "next/image";
import NewPost from "./NewPost";
import { CSSProperties, useState, useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import Add from '../../public/svg/circle-plus-solid.svg'
import VanillaTilt from 'vanilla-tilt';
import Discord from '../../public/svg/discord.svg'

const ClipLoaderOverride: CSSProperties = {

}

interface PreFeedProps {
  linkTo: string;
  tempNum: string;
  title: string;
  description: string;
  lf: string;
  [key: string]: any;
}

function PreFeed(props : PreFeedProps) {

  const [newPost, setNewPost] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const tilt = useRef(null);

  const options = {
    max: 6,
    speed: 100,
    glare: false
  };
    
    useEffect(() => {
      if (tilt.current){
        VanillaTilt.init(tilt.current, options);
      }
    }, [options]);

  function handleClick(){
    setNewPost(true);
  }

  function printNewPost(newPost : boolean){
    if (newPost) {
      return <NewPost setNewPost={setNewPost} setLoading={setLoading}/>;
    }
  }

  return (
    <div className="flex flew-row mt-[4vw] w-[80%] h-[6vw] relative">
        <div ref={tilt} {...props} className="flex flex-row w-[40%] glassmorphism rounded-3xl items-center relative">
          <a className="login-icon-shadow w-[3.5vw] h-[3.5vw] mx-[2vw] mr-[4.5vw]" onClick={handleClick}>
            <Image src={Add} alt="discord" className="filter-baby-orange mx-[0.75vw] icon hover:scale-110" />
          </a>
          <p className=" text-white text-xl font-quicksandLight white-text-shadow">
            Had a dream?
          </p>
        </div>
          {loading ? <div className="z-[100] fixed top-0 left-0 flex justify-center items-center w-full h-full">
            <ClipLoader
              color={"#000000"}
              loading={loading}
              size={150}
              //cssOverride={ClipLoaderOverride}
            />
          </div> : null}
          {printNewPost(newPost)}
      <Icons />
    </div>
  );
}

export default PreFeed;
