import { ref, set, get, child } from "firebase/database"
import { database as db } from "./firebase.js"
import { encodeEmail, getUserID, getUserByID } from "./utils/userUtils.js"
import obj from "../jsons/dummy.json" assert {type: "json"};

async function pushDummyData() {
    await set(ref(db, '/'), obj);
    console.log("resolved");
    process.exit();
}

// pushDummyData()

// const dbRef = ref(db, 'userIDList/eWlkaWNoZW5AZ21haWwuY29t');

// get(dbRef).then((snapshot) => {
//     if (snapshot.exists()) {
//         console.log('exists');
//     } else {
//         console.log('not exists');
//     }
// })

const email = "yidichen@gmail.com";

const encoded = encodeEmail(email);

console.log(encoded);

const userID = await getUserID(encoded);

console.log(userID);

const user = await getUserByID(userID);

console.log(user.email, user.passHash, user.username);