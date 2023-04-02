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
        if (hour < 12) {
            greet = "Good morning";
        } else if (hour < 18) {
            greet = "Good afternoon";
        } else {
            greet = "Good evening";
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
        <h2 className="font-quicksandBold text-[4vw] text-white white-text-shadow">{Greet() + " " + userName + "!"}</h2>
    );
}

export default Greeting;