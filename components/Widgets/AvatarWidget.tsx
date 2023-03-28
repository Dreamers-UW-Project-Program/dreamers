import Image from "next/image";
import { getFriendsListByID, getUserByID } from "../../firebase/utils/userUtils";
import { useContext, useEffect, useState } from "react";
import { RenderContext } from "contexts/render";

function AvatarWidget() {
  const renderState = useContext(RenderContext);
  const id = renderState.user.userID;
  const [avatar, setAvatar] = useState("");
	const [userName, setUserName] = useState({});

  useEffect(() => {
    async function getAvatar(id: string) {
      try {
        const res = await getUserByID(
          id ?? process.env.DEFAULT_USER_ID ?? ""
        );
        console.log(userName);
        setAvatar(res.avatar);
      } catch (e) {
        console.log(e);
      }
    }
    getAvatar(id ?? process.env.DEFAULT_USER_ID ?? "");
  }, []);
  useEffect(() => {
    async function getUserName(id: string) {
      try {
        const res = await getUserByID(
          id ?? process.env.DEFAULT_USER_ID ?? ""
        );
        console.log(userName);
        setUserName(res.username);
      } catch (e) {
        console.log(e);
      }
    }
    getUserName(id ?? process.env.DEFAULT_USER_ID ?? "");
  }, []);

  function Greeting() {
    const hour = new Date().getHours();
    let greeting = "";
    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour < 18) {
      greeting = "Good afternoon";
    } else {
      greeting = "Good evening";
    }
    return greeting;
  }

  function logout() {
    renderState.setUser("null");
    localStorage.removeItem('userObj');
  }

  return (
    <div className="w-[25vw] h-[25%] bg-transparent my-[1vw] border-x-2 border-t-2 text-white">
      <div className="flex flex-row items-center justify-evenly mx-[0.5vw] my-[1vw] h-[8vw]">
        <img
          src={avatar}
          alt="Your Profile Picture"
          className="w-[8vw] rounded-full"
        />
        <div>
          <p className="text-white font-serif">{Greeting()}!</p>
          <p className="text-white font-serif" onClick={logout} >{"@" + userName + " click to logout"}</p>
        </div>
      </div>
    </div>
  );
}

export default AvatarWidget;
