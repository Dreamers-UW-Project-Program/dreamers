import Icons from "./Icons";
import NewPost from "./NewPost";
import { CSSProperties, useState } from "react";
import { ClipLoader } from "react-spinners";

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
      <div className="w-[40%] h-full border-white border-4 rounded-3xl">
        <div className="flex flex-row h-full mx-[1vw] content-center items-center gap-3">
          <button onClick={handleClick}><img src="/images/add-button.png" alt="add" className="h-[4vw]"></img></button>
          <p className="flex-1 text-white text-xl font-serif">
            Have a dream? Post it....
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
