import React, { useEffect, useState, useContext } from 'react';
import { RenderContext } from '../../contexts/render'
import { getFriendsListByID, getUserByID } from "../../firebase/utils/userUtils";

function Greeting() {
    const renderState = useContext(RenderContext);
    const id = renderState.user.userID;
    const [userName, setUserName] = useState({});

    function Greet() {
        const hour = new Date().getHours();
        let greet = "";
        if (hour <= 12 && hour > 6) {
            greet = "Good morning";
        } else if (hour == 6) {
            greet = "Go to sleep"
        } else if (hour <= 18 && hour > 12) {
            greet = "Good afternoon";
        } else if (hour > 18 && hour < 22) {
            greet = "Good evening";
        } else {
            greet = "Good night";
        }
        return greet;
    }
    
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

    
    return (
        <h2 className="font-quicksandBold mt-[5.5vw] text-[4vw] text-white white-text-shadow">{Greet() + " " + userName + "!"}</h2>
    );
}

export default Greeting;