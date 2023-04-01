import { useContext, useEffect, useState } from "react";
import { Post } from "@customTypes/globals";
import { likePost, commentPost } from "../../services/postServices";
import { RenderContext } from "@contexts/render";

interface DreamContentProps extends Post {
  setLikes: any;
  setComments: any;
}
const DreamContent = (props: DreamContentProps) => {
  const [newComment, setNewComment] = useState<boolean>(false);
  const [numChars, setNumChars] = useState<number>(0);
  const [formData, setFormData] = useState<string>("");
  const renderState = useContext(RenderContext);

  async function like() {
    const res = await likePost(
      props.postID,
      renderState.user.userID,
      renderState.user.token
    );
    props.setLikes((likes: any) => ({
      ...likes,
      [renderState.user.userID]: true,
    }));
    console.log("like:", res);
  }

  function comment() {
    setNewComment(true);
  }

  function handleCancelComment(){
    setNewComment(false);
  }

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setNumChars(value.length);
    setFormData(value);
  }

  function commentSection() {
    if (newComment) {
      return (
        <form className="flex flex-col items-end gap-2">
          <textarea maxLength={150} onChange={handleTextAreaChange} className="resize-none text-white bg-transparent border-2 rounded-xl border-white w-[95%] h-[5vw] p-[0.5vw]"></textarea>
          <div className="text-sm text-slate-300">
              {numChars}/150 characters use
          </div>
          <div className="flex flex-row gap-3">
            <button className="border-2 border-white rounded-xl w-[6vw] px-[1vw] py-[0.2vw] bg-orange-500 hover:bg-orange-700" onClick={handleCancelComment}>Cancel</button>
            <button className="border-2 border-white rounded-xl w-[6vw] px-[0.9vw] py-[0.2vw] bg-pink-500 hover:bg-pink-700" type="submit">Comment</button>
          </div>
        </form>
      );
    }
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
        <button className="text-2xl" onClick={like}>
          💖
        </button>
        <button className="text-2xl" onClick={comment}>
          💬
        </button>
      </div>
      {commentSection()}
    </div>
  );
};

export default DreamContent;
