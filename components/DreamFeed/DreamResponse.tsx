import { PostComments, PostLikes } from "@customTypes/globals";
import { getUserByID } from "@firebase/utils/userUtils";
import { useState, useEffect } from "react";

type DreamResponseProps = {
    comments: PostComments;
    likes: PostLikes;
}
const DreamResponse = ( props: DreamResponseProps) => {
    //console.log(props.comments)
    const [users, setUsers] = useState({likeUsers: {}, commentUsers: {}});

    useEffect(() => {
        const getLikeUser = async (id: string) => {
            const user = await getUserByID(id);
            setUsers(users => ({
                likeUsers: {...users.likeUsers, [id]: user}, 
                commentUsers: users.commentUsers,
            }));
        }
        
        const likeIDs = Object.keys(props.likes);
        for(let i = 0; i<likeIDs.length; i++){
            getLikeUser(likeIDs[i]);
        }

        const getCommentUser = async (id: string, commentID: string) => {
            const user = await getUserByID(id);
            setUsers(users => ({
                likeUsers: users.likeUsers,
                commentUsers: {...users.commentUsers, [id]: [user, commentID]}
            }));
            //console.log("comment", commentUsers)
        }

        const commentIDs = Object.keys(props.comments);
        for (let i = 0; i<commentIDs.length; i++){
            getCommentUser(props.comments[commentIDs[i]]["userID"], commentIDs[i]);
        }
    }, [])

    return (
        <div className="basis-1/3 flex flex-col border-[0.3vw] rounded-lg w-[100vw] p-[0.1vw]">
            <div className="h-[5vw]">
                <p className="border-b-[0.1vw] border-orange-500">💖</p>
                <div className="text-white">
                    {Object.keys(users.likeUsers).map(userID => {
                        return <p>{users.likeUsers[userID]["username"]}</p>
                    })}
                </div>
            </div>
            <div>
                <p className="border-b-[0.1vw] border-orange-500">💬</p>
                <div className="text-white">
                    {Object.keys(users.commentUsers).map(userID => {
                        const user = users.commentUsers[userID][0];
                        return <p>{user["username"]}: {props.comments[users.commentUsers[userID][1]]["comment"]}</p>
                    })}
                </div>
            </div>
        </div>
    )
}

export default DreamResponse;