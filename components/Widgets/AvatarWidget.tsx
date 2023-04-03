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
        // console.log(userName);
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
        // console.log(userName);
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
    <div className="flex items-center justify-evenly p-[0.25vw] lg:p-[1vw] w-[20vw] h-[18%] bg-transparent my-[1vw] rounded-md text-white">
      <div className="flex flex-row items-center justify-evenly mx-[0.5vw] my-[1vw] h-[8vw]">
        <img
          src={avatar}
          alt="Your Profile Picture"
          className="w-[35%] rounded-full border-white border-2 lighter-sunset-box-shadow xl:mr-8"
          //style={{borderRadius: "50%"}}
        />
        <div>
          <p className="hidden text-white font-robotoRegular text-sm xl:text-lg">{Greeting()}!</p>
          <p className="text-white font-quicksandLight text-sm xl:text-lg">{"@" + userName}</p>
          <div className="text-black font-quicksandRegular bg-white mt-4 mx-auto text-center p-1/2 xl:p-1 rounded-lg icon-shadow hover:scale-105" onClick={logout}>Logout</div>
        </div>
      </div>
    </div>
  );  
}

export default AvatarWidget;
