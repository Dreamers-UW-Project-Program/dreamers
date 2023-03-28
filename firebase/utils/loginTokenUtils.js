import { getUserByID, encodeEmail, getUserID } from "./userUtils.js";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// All tokens use RAW email, in ascii

export const getToken = (request) => {
    const authorization = request.headers['authorization'];
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
}

export const checkToken = (token, email) => {
    try {
        const unhashedEmail = jwt.verify(token, process.env.TOKEN_HASH);
        if (!token || !unhashedEmail || unhashedEmail !== email) {
            return false;
        }
        return true;
    }
    catch {
        return false;
    }
}

export async function getUserIDByToken(token) {
    try {
        const unhashedEmail = jwt.verify(token, process.env.TOKEN_HASH);
        const encoded = encodeEmail(unhashedEmail);
        const UserID = await getUserID(encoded);
        return UserID;
    } catch {
        return null;
    }
}