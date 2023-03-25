import type { NextApiRequest, NextApiResponse } from 'next'
import { database as db } from "../../firebase/firebase.js"
import { ref, push, set } from "firebase/database"
import { encodeEmail, duplicateEmail } from "../../firebase/utils/userUtils.js"

const bcrypt = require('bcrypt');

type Data = {
    email?: string,
    passHash?: string,
    username?: string,
    avatar?: string,
    message?: string
}

async function userListHandler(email: string, passHash: string, username: string, avatar: string) {
    const userListRef = ref(db, '/userList');
    const newUserRef = await push(userListRef);
    await set(newUserRef, { email, passHash, username, avatar });
    return newUserRef.key;
}

async function userIdListHandler(email: string, id: string) {
    const newUserIDRef = ref(db, '/userIDList/' + email);
    await set(newUserIDRef, { id });
}

export default async function registerHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method !== "POST") {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }


    try{
        const { email, password, username, avatar } = req.body;
        const encoded = encodeEmail(email);

        const isDuplicate = await duplicateEmail(encoded);
        if (isDuplicate) {
            res.status(400).send({ message: 'Email already exists' })
            return
        }

        const saltOrRounds = 10;
        const passHash = await bcrypt.hash(password, saltOrRounds);

        const key = await userListHandler(encoded, passHash, username, avatar);
        await userIdListHandler(encoded, key || "INVALID");

        res.status(201).json({ email: encoded, passHash, username, avatar });
    } catch {
        res.status(400).send({ message: 'Invalid body parameters'});
    }    
}
