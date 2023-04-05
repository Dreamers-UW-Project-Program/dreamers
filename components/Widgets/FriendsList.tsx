import {
  getFriendsListByID,
  getUserByID,
} from "../../firebase/utils/userUtils";
import { useEffect, useState, useContext } from "react";
import { RenderContext } from "@contexts/render";


type user = { [t: string]: string };

const FriendsList = () => {
  const renderState = useContext(RenderContext);

  const [friends, setFriends] = useState<{ [s: string]: user }>({});

  useEffect(() => {
    async function getFriendsID(id: string) {
      try {
        const res = await getFriendsListByID(
          renderState.user.userID ?? process.env.DEFAULT_USER_ID ?? ""
        );
        // console.log(friendsList);
        renderState.setFriendsList(res);
      } catch (e) {
        console.log(e);
      }
    }
    getFriendsID(renderState.user.userID ?? process.env.DEFAULT_USER_ID ?? "");
  }, []);

  useEffect(() => {
    try {
      Object.keys(renderState.friendsList).forEach(async (friend) => {
        const currFriend = await getUserByID(friend);
        setFriends((friends) => ({
          ...friends,
          [friend]: currFriend,
        }));
        // console.log(friends);
      });
    } catch (e) {
      console.log(e);
    }
  }, [renderState.friendsList]);

  return (
    <div className="mx-4 mb-6 h-full overflow-auto scroll-smooth font-robotoLight justify-center pl-3" >
      <div className="flex flex-col items-center h-full" style={{ maxHeight: "100%" }}>
        {Object.keys(friends ?? {}).map((friend) => {
          // console.log(friend);
          return <div className="flex flex-row text-md my-2 bg-[#fffdf830] border-[#fffdf84f] border-[1.5px] rounded-lg 
          font-quicksandLight p-2 text-box-shadow items-center justify-center w-[15vw] overflow-y-auto">
                  <img className="w-[2vw] h-[2vw] rounded-2xl mr-3" src={friends[friend]["avatar"]} alt="" />
                    {friends[friend]["username"]}
                </div>;
        })}
      </div>
    </div>
  );
};

export default FriendsList;
