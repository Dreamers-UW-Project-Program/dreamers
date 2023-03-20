import { ref, get } from "firebase/database"
import { database as db } from "../firebase.js";

// convert email from ascii to base64
export const encodeEmail = (email) => {
    return Buffer.from(email).toString('base64');
}

// convert email from base64 to ascii
export const decodeEmail = (encodeEmail) => {
    return Buffer.from(encodeEmail, 'base64').toString('ascii');
}

// check if email already exists
export async function duplicateEmail(encodedEmail) {

    // Define the reference to check
    const refToCheck = ref(db, 'userIDList/' + encodedEmail);
    const snapshot = await get(refToCheck);

    if (snapshot.exists()) {
        return true;
    }
    return false;
}

export async function getUserID(encodedEmail) {
    const refToCheck = ref(db, 'userIDList/' + encodedEmail + '/id');
    const snapshot = await get(refToCheck);

    if (snapshot.exists()) {
        return snapshot.val();
    }
    return null;
}

export async function getUserByID(id) {
    const refToCheck = ref(db, 'userList/' + id);
    const snapshot = await get(refToCheck);

    if (snapshot.exists()) {
        return snapshot.val();
    }
    return null;

}