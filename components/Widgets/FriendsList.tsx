import {
  getFriendsListByID,
  getUserByID,
} from "../../firebase/utils/userUtils";
import { useEffect, useState, useContext } from "react";
import { RenderContext } from "@contexts/render";
import Image from 'next/image'

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
    <div className="mx-4 mb-6 h-full overflow-hidden font-robotoLight">
      <div className="flex flex-col items-start overflow-auto h-full scroll-smooth">
        {Object.keys(friends ?? {}).map((friend) => {
          // console.log(friend);
          return <div className="text-md bg-black my-2 text-white rounded-lg">
                  {friends[friend]["username"]}
                  <img src={friends[friend]["avatar"]} alt="" className="w-[2vw] h-[2vw]" />
                </div>;
        })}
      </div>
    </div>
  );
};

export default FriendsList;
