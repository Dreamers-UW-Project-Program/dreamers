import type { NextApiRequest, NextApiResponse } from 'next'
import { database as db } from "../../firebase/firebase.js"
import { ref, push, set } from "firebase/database"
import { encodeEmail, duplicateEmail } from "@firebase/utils/userUtils.js"
import { uploadProfileImageFromBase64url } from "@firebase/utils/uploadUtils";
import { getDownloadUrlFromPath } from '@firebase/utils/downloadUtils';
import multer from "multer";
import nc from "next-connect";

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
    
    await uploadProfileImageFromBase64url(avatar, newUserRef.key);
    const downloadURL = await getDownloadUrlFromPath(`user-profile-images/${newUserRef.key}`)
    await set(newUserRef, { email, passHash, username, avatar: downloadURL });

    return newUserRef.key;
}

async function userIdListHandler(email: string, id: string) {
    const newUserIDRef = ref(db, '/userIDList/' + email);
    await set(newUserIDRef, { id });
}

const registerHandler = nc<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        res.status(501).json({error: `Sorry something happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method "${req.method}" not allowed!`});
    },
});

registerHandler.use(multer().any());

registerHandler.post(async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;
        const avatar = req.files[0].buffer.toString('base64url');
        
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

        return res.status(201).json({ email: encoded, passHash, username, avatar });
    } catch (e) {
        console.log(e);
        return res.status(400).send({ message: 'Invalid body parameters'});
    }
})

export const config = {
    api: {
      bodyParser: false,
    },
  }

export default registerHandler;