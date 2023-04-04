import { Comment, PostComments, PostLikes, User } from "@customTypes/globals";
import { getUserByID } from "@firebase/utils/userUtils";
import { useState, useEffect } from "react";

type DreamResponseProps = {
    comments: PostComments;
    likes: PostLikes;
}
const DreamResponse = (props: DreamResponseProps) => {
    //console.log(props.comments)
    const [users, setUsers] = useState<{
        likeUsers: { [id: string]: User },
        commentUsers: { [commentID: string]: User}
    }>({ likeUsers: {}, commentUsers: {}});

    useEffect(() => {
        const getLikeUser = async (id: string) => {
            const user = await getUserByID(id);
            setUsers(users => ({
                likeUsers: { ...users.likeUsers, [id]: user },
                commentUsers: users.commentUsers,
            }));
        }

        const likeIDs = Object.keys(props.likes);
        for (let i = 0; i < likeIDs.length; i++) {
            getLikeUser(likeIDs[i]);
        }
    }, [props.likes])

    useEffect(() => {
        const getCommentUser = async (id: string, commentID: string) => {
            const user = await getUserByID(id);
            setUsers(users => ({
                likeUsers: users.likeUsers,
                commentUsers: {...users.commentUsers, [commentID]: user }
            }));
            // console.log(users.commentUsers)
        }

        const commentIDs = Object.keys(props.comments);
        for (let i = 0; i < commentIDs.length; i++) {
            getCommentUser(props.comments[commentIDs[i]]["userID"], commentIDs[i]);
        }
    }, [props.comments]);
    
    return (
        <div className="w-[95%] mb-4">
            <p className="font-poiretOne text-white text-2xl mb-3 ml-1 less-white-text-shadow tracking-wide">Comments</p>
            <div className="flex flex-col rounded-lg w-full p-[0.1vw] font-quicksandLight text-glassmorphism bg-[#fffdf81b]
                border-2 border-[#fffdf856] text-box-shadow">
                <div className="hidden h-[5vw]">
                    <p className="border-b-[0.1vw] border-orange-500">💖</p>
                    <div className="text-white font-quicksandRegular">
                        {Object.keys(users.likeUsers).map(userID => {
                            return <p>{users.likeUsers[userID]["username"]}</p>
                        })}
                    </div>
                </div>
                    <div className="text-white p-2">
                        {Object.keys(users.commentUsers).map(commentID => {
                            const user: User = users.commentUsers[commentID];
                            const comment: Comment = props.comments[commentID];
                            return  <div className="flex flex-row pb-4">
                                        <img src={user["avatar"]} alt="" className="w-[1.7vw] h-[1.7vw] rounded-xl mr-2 border-[1px]"></img>
                                        <p><span className="font-quicksandRegular least-white-text-shadow">{user["username"]}</span>: {comment["comment"]}</p>
                                    </div>
                        })}
                    </div>
            </div>
        </div>
        
    )
}

export default DreamResponse;