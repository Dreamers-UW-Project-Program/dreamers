import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1lKD7cgw44jVlDG9yNmRKiqenWSN7ABE",
  authDomain: "dreamers-7971d.firebaseapp.com",
  databaseURL: "https://dreamers-7971d-default-rtdb.firebaseio.com",
  projectId: "dreamers-7971d",
  storageBucket: "dreamers-7971d.appspot.com",
  messagingSenderId: "417251336954",
  appId: "1:417251336954:web:86c273f9187af34a7a1f43",
  measurementId: "G-S2RFG6VJKZ"
};

// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize realtime database
export const database = getDatabase(app);

//intialize cloud storage
export const storage = getStorage(app)