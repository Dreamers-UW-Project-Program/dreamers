import { useContext, useEffect, useState } from "react";
import { Post, Comment, PostComments, PostLikes, User  } from "@customTypes/globals";
import { likePost, commentPost } from "../../services/postServices";
import { RenderContext } from "@contexts/render";
import DreamResponse from "./DreamResponse";
import Image from 'next/image';
import CommentIcon from '../../public/svg/comment-solid.svg'
import LikeIcon from '../../public/svg/heart-solid.svg'
import { getUserByID } from "@firebase/utils/userUtils";
import { addFriend } from "@services/friendServices";
import Aos from "aos";
import "aos/dist/aos.css";

interface DreamContentProps extends Post {
  setLikes: any;
  setComments: any;
}
const DreamContent = (props: DreamContentProps) => {
  const [newComment, setNewComment] = useState<boolean>(false);
  const [numChars, setNumChars] = useState<number>(0);
  const [userComment, setUserComment] = useState<string>("");
  const [isHidingComment, setIsHidingComment] = useState<boolean>(true);
  const [likes, setLikes] = useState(props.likes);
  const [comments, setComments] = useState(props.comments);
  const [author, setAuthor] = useState<User>();
  const renderState = useContext(RenderContext);

  useEffect(() => {
    Aos.init({duration: 1000});
  }, []);
  
  useEffect(() => {
    async function getUser() {
      const user = await getUserByID(props.authorID);
      setAuthor(user);
    }

    getUser();
  }, [])
  
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

  async function postComment(event: React.FormEvent<HTMLFormElement>) {
    //event.preventDefault() // uncommenting this line creates error with the props or wtv
    await commentPost(
      props.postID,
      renderState.user.userID,
      renderState.user.token,
      userComment,
    )

    props.setComments((comments: any) => ({
      [renderState.user.userID]: comment, // users can post more than one comment
      ...comments,
    }));
    setNewComment(false);
    setUserComment("")
    setNumChars(0);
  }

  function comment() {
    setNewComment(true);
    setIsHidingComment(false);
  }

  function handleCancelComment(){
    setIsHidingComment(true);
    setNewComment(false);
    setTimeout(() => {
      setUserComment("");
      setNumChars(0);
    }, 300);
  }

  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setNumChars(value.length);
    setUserComment(value);
  }


  return (
    <div>
      <div className="flex flex-col gap-y-2 text-white bg-[#fffdf830] border-[#fffdf867] border-2 pl-[3.5vw] pr-[4vw] pt-[1vw] pb-[0.5vw]
        rounded-3xl font-quicksandLight min-h-[30vw] relative">
        <div className="flex justify-between pb-5 relative">
          <div className="mt-4 mb-4 pl-5 text-3xl font-poiretOne tracking-wider less-white-text-shadow">{props.title}</div>
            { author ?
              <div className="absolute right-[-10px] top-[-20px]">
                <div className="mt-5 text-md font-poiretOne tracking-wide">
                    {author.username}
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <img className="w-[4vw] rounded-full border-white border-2 lighter-sunset-box-shadow mb-[6px]" src={author.avatar}/>
                  <button 
                    className="bg-white text-black font-quicksandRegular text-sm w-[4.5vw] rounded-lg transition-1s icon-shadow 
                    hover:scale-105 hover:cursor-pointer z-[1000]" 
                    onClick={async () => await addFriend(renderState.user.userID, props.authorID, renderState.user.token)}>
                      Follow
                  </button>
                </div>
              </div>
              : ""
            }
        </div>
        <div className="flex relative gap-10">
          <div className="w-[55%] bg-[#fffdf822] p-5 rounded-xl border-[1.5px] border-[#fffdf82f] text-box-shadow text-white">
            {props.body}
          </div>
          <div className="w-[45%] my-auto relative">
            <img src={props.thumbnail} className="w-[250px] h-[200px] pr-0 rounded-2xl border-[#ffffff5a] border-2 less-white-box-shadow 
              absolute top-[-70px] left-[15px]" />
          </div>
        </div>
        <div className="flex flex-row pt-1 pb-4 justify-between bottom-0">
          <div>
            <button className="" onClick={like}>
              <Image src={LikeIcon} alt="like" className="filter-red w-[1.75vw] h-[1.65vw] mr-[0.75vw] icon hover:scale-125"/>
            </button>
            <button className="text-2xl" onClick={comment}>
              <Image src={CommentIcon} alt="comment" className="filter-white w-[1.75vw] h-[1.65vw] mx-[0.75vw] icon hover:scale-125"/>
            </button>
          </div>
        </div>
        <div className="text-lg tracking-wide font-poiretOne absolute bottom-[24px] right-11">{props.date}</div>
      </div>
      <form className={`flex flex-col items-end gap-2 bg-[#fffdf830] border-[#fffdf867] border-x-2 border-b-2 border-t-[1px] rounded-2xl pr-6 py-4
        hidden-div ${newComment ? 'show' : '' }`}
        onSubmit={postComment}>
          <textarea 
            maxLength={150} 
            onChange={handleTextAreaChange} 
            className="resize-none text-white bg-[#fffdf822] rounded-xl border-2 border-[#fffdf87e] text-box-shadow w-[95%] h-[5vw] p-[0.5vw] font-quicksandLight">
          </textarea>
          <div className="text-sm text-white">
              {numChars}/150 characters
          </div>
          <div className="flex flex-row gap-3">
            <button 
              type='button' 
              className="bg-gradient-to-r from-rose-400 to-orange-300 text-white font-quicksandBold py-2 px-3 rounded-xl w-[6vw] 
                hover:scale-105 transition-1s hover:sunset-box-shadow" 
              onClick={handleCancelComment}>
                Cancel
            </button>
            <button 
              className="bg-gradient-to-r from-pink-600 to-orange-400 text-white font-quicksandBold py-2 px-3 rounded-xl w-[7vw] 
                hover:scale-105 transition-1s hover:sunset-box-shadow" 
              type="submit">
                Comment
            </button>
          </div>
      </form>
    </div>
  );
};

export default DreamContent;