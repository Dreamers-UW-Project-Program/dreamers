import { createContext, useEffect, useState } from 'react';

export const RenderContext = createContext();

export function RenderContextProvider({ children }) {

    const [logIn, setLogIn] = useState(true);
    const [register, setRegister] = useState(false);
    const [mainDisplay, setMainDisplay] = useState(false);
    const [user, setUser] = useState(null);
    const [friendsList, setFriendsList] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('userObj');
        // console.log("init storedUser:", storedUser);
        if (storedUser !== 'null' && storedUser !== null) {
            const userObj = JSON.parse(storedUser);
            // console.log("user", userObj);
            setUser(userObj);
            setLogIn(false);
            setMainDisplay(true);
        }

    }, []);

    useEffect(() => {
        // console.log("state changed", user);
        localStorage.setItem('userObj', JSON.stringify(user));
        if (user == "null") {
            setMainDisplay(false);
            setLogIn(true);
        }
    }, [user]);

    return <RenderContext.Provider
        value={{ logIn, setLogIn, register, setRegister, mainDisplay, setMainDisplay, user, setUser, friendsList, setFriendsList }}
    >
        {children}
    </RenderContext.Provider>
}