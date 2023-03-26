import { createContext, useState } from 'react';

export const RenderContext = createContext();

export function RenderContextProvider({ children }) {

    const [logIn, setLogIn] = useState(true);
    const [register, setRegister] = useState(false);
    const [mainDisplay, setMainDisplay] = useState(false);

    return <RenderContext.Provider 
                value={{logIn, setLogIn, register, setRegister, mainDisplay, setMainDisplay}}
            >
            {children}
            </RenderContext.Provider>
}