import Icons from "./Icons";
import NewPost from "./NewPost";
import { useState } from "react";

function PreFeed() {
  const [newPost, setNewPost] = useState<boolean>(false);
  function handleClick(){
    setNewPost(true);
  }

  function printNewPost(newPost : boolean){
    if (newPost) {
      return <NewPost />;
    }
  }
  return (
    <div className="flex flew-row mt-[4vw] w-[80%] h-[6vw] relative">
      <div className="w-[40%] h-full border-white border-4 rounded-3xl">
        <div className="flex flex-row h-full mx-[1vw] content-center items-center gap-3">
          <img src="/images/add-button.png" alt="add" className="h-[4vw]" onClick={handleClick}></img>
          <p className="flex-1 text-white text-xl font-serif">
            Have a dream? Post it....
          </p>          
        </div>
        <p>{printNewPost(newPost)}</p>
      </div>
      <Icons />
    </div>
  );
}

export default PreFeed;
