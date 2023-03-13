import { createContext, useEffect, useState } from 'react';
import { ref, getDatabase, child, get, set } from 'firebase/database';
import { database } from '../firebase/firebase';

export const FirebaseContext = createContext();

export function FirebaseContextProvider({ children }) {
    return <FirebaseContext.Provider 
                value={{}}
            >
            {children}
            </FirebaseContext.Provider>
}