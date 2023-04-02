import Icons from "./Icons";
import Image from "next/image";
import NewPost from "./NewPost";
import { CSSProperties, useState } from "react";
import { ClipLoader } from "react-spinners";
import Add from '../../public/svg/circle-plus-solid.svg'

const ClipLoaderOverride: CSSProperties = {

}


function PreFeed() {
  const [newPost, setNewPost] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
        <div className="flex flex-row w-[40%] border-white border-4 rounded-3xl justify-between content-center items-center">
          <a className="icon-shadow">
              <Image src={Add} alt="add" className="h-[3vw] filter-white icon hover:scale-105" onClick={handleClick} />
          </a>
          <div className="flex h-full mx-[1vw] gap-3">
            <p className="flex-1 text-white text-xl font-quicksandLight">
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
        </div>
      <Icons />
    </div>
  );
}

export default PreFeed;
