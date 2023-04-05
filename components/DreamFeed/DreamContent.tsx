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
  const [author, setAuthor] = useState<User>();
  const renderState = useContext(RenderContext);

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',

    });
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
    event.preventDefault()
    const newCommentID = await commentPost(
      props.postID,
      renderState.user.userID,
      renderState.user.token,
      userComment,
    );

    props.setComments((comments: any) => ({
      ...comments,
      [newCommentID]: {
        "comment": userComment,
        "userID": renderState.user.userID
      }, // users can post more than one comment
    }));
    setUserComment("");
    // setNewComment(false);
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


  async function friend() {
    await addFriend(renderState.user.userID, props.authorID, renderState.user.token);
    const id = props.authorID;
    renderState.setFriendsList((friendList: any) => ({
      ...friendList,
      [id]: true,
    }));
  }

  return (
    <div>
      <div className="flex flex-col gap-y-2 text-white bg-[#fffdf830] border-[#fffdf867] border-2 pl-[4vw] pr-[4vw] pt-[1vw] pb-[0.5vw]
        rounded-3xl font-quicksandLight min-h-[30vw] relative">
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" className="flex justify-between pb-5 relative">
          <div className="mt-[2.75rem] mb-1 pl-5 text-3xl font-poiretOne tracking-wider less-white-text-shadow">{props.title}</div>
            { author ?
              <div className="absolute right-[7px] top-[-10px]">
                <div className="mt-5 text-md font-poiretOne tracking-wide">
                    {author.username}
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <img className="w-[4vw] h-[4vw] rounded-full border-white border-2 lighter-sunset-box-shadow mb-[6px]" src={author.avatar}/>
                  <button 
                    className="bg-white text-black font-quicksandRegular text-sm w-[4.5vw] rounded-lg transition-1s icon-shadow 
                    hover:scale-105 hover:cursor-pointer z-[1000]" 
                    onClick={friend}>
                      Follow
                  </button>
                </div>
              </div>
              : ""
            }
        </div>
        <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" className="flex relative min-h-[22vw] items-center">
          <div className="flex w-[57%] bg-[#fffdf822] p-5 rounded-xl border-[1.5px] border-[#fffdf82f] text-box-shadow text-white
            items-center justify-center">
            {props.body}
          </div>
          <div className="w-[43%] my-auto relative">
            <img src={props.thumbnail} className="w-[16vw] h-[16vw] pr-0 rounded-2xl border-[#ffffff5a] border-2 glass-box-shadow 
              absolute top-[-115px] left-[4.3vw]" />
          </div>
        </div>
        <div className="flex flex-row pt-1 pb-4 bottom-0 ml-1">
            <button className="less-red-icon-shadow" onClick={like}>
              <Image src={LikeIcon} alt="like" className="w-[25px] h-[25px] mr-[0.4vw] icon hover:scale-125"/>
            </button>
            <p className="text-white font-quicksandLight text-lg mr-[1vw] least-white-text-shadow">{Object.keys(props.likes).length}</p>
            <button className="less-icon-shadow" onClick={comment}>
              <Image src={CommentIcon} alt="comment" className="w-[25px] h-[25px] mx-[0.75vw] icon hover:scale-125"/>
            </button>
        </div>
        <div className="text-lg tracking-wide font-poiretOne absolute bottom-[1.8vw] right-[4.25vw]">{props.date}</div>
      </div>
      <div className={`flex flex-col items-end gap-2 bg-[#fffdf830] border-[#fffdf867] border-x-2 border-b-2 border-t-[1px] rounded-2xl pr-6 py-4
        hidden-div ${newComment ? 'show' : '' }`}>
        <DreamResponse comments={props.comments} likes={props.likes} />
        <form className="flex flex-col items-end w-full mt-1"
        onSubmit={postComment}>
          <textarea 
            maxLength={150} 
            onChange={handleTextAreaChange} 
            className="resize-none text-white bg-[#fffdf822] rounded-xl border-[1.5px] border-[#fffdf84f] text-box-shadow w-[95%] h-[5vw] p-[0.5vw] font-quicksandLight">
          </textarea>
          <div className="text-sm font-quicksandLight text-white">
              {numChars}/150 characters
          </div>
          <div className="flex flex-row gap-3 mt-4">
            <button 
              type='button' 
              className="bg-gradient-to-r from-rose-400 to-orange-300 text-white font-quicksandMedium py-2 px-3 rounded-xl w-[6vw] 
              center-items justify-center hover:scale-110 transition-1s hover:sunset-box-shadow" 
              onClick={handleCancelComment}>
                Cancel
            </button>
            <button 
              className="bg-gradient-to-r from-pink-600 to-orange-400 text-white font-quicksandMedium py-2 px-3 rounded-xl w-[7vw] 
                center-items justify-center hover:scale-110 transition-1s hover:sunset-box-shadow" 
              type="submit">
                Comment
            </button>
          </div>
      </form>
      </div>
    </div>
  );
};

export default DreamContent;