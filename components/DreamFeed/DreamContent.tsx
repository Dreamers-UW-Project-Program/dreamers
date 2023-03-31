import { useContext, useEffect } from "react";
import { Post } from "@customTypes/globals";
import { likePost, commentPost } from "../../services/postServices"
import { RenderContext } from "@contexts/render";

interface DreamContentProps extends Post {
  setLikes: any;
  setComments: any;
}
const DreamContent = (props: DreamContentProps) => {
  
  const renderState = useContext(RenderContext);
  async function like() {
    const res = await likePost(props.postID, renderState.user.userID, renderState.user.token);
    props.setLikes((likes: any) => ({
      ...likes,
      [renderState.user.userID] : true
    }))
    console.log("like:", res);
  }

  return (
    <div className="basis-6/10 flex flex-col gap-y-2 text-white border-[0.5vw] px-[4vw] py-[0.5vw] rounded-r-3xl font-serif">
      <div className="flex justify-between">
        <div className="text-lg ">{props.title}</div>
        <div>{props.date}</div>
      </div>
      <div className="flex flex-row gap-2">
        {props.body}
        <img src={props.thumbnail} className="w-[15vw]" />
      </div>
      <div className="flex flex-row">
        <p className="text-2xl" onClick={like}>💖</p>
        <p className="text-2xl">💬</p>
      </div>
    </div>
  );
};

export default DreamContent;
