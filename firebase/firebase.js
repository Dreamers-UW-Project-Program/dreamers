import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_1,
  authDomain: "dreamers-7971d.firebaseapp.com",
  databaseURL: "https://dreamers-7971d-default-rtdb.firebaseio.com",
  projectId: "dreamers-7971d",
  storageBucket: "dreamers-7971d.appspot.com",
  messagingSenderId: "417251336954",
  appId: "1:417251336954:web:86c273f9187af34a7a1f43",
  measurementId: "G-S2RFG6VJKZ"
};

const firebaseConfig2 = {
  apiKey: process.env.FIREBASE_API_2,
  authDomain: "dreamers-v2.firebaseapp.com",
  projectId: "dreamers-v2",
  storageBucket: "dreamers-v2.appspot.com",
  messagingSenderId: "292570117990",
  appId: "1:292570117990:web:d2de52627888cf50f53aa7",
  measurementId: "G-C2BZM6F5C7"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize realtime database
export const database = getDatabase(app);

//intialize cloud storage
export const storage = getStorage(app)

const app2 = initializeApp(firebaseConfig2, "secondary");
export const storage2 = getStorage(app2);