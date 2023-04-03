import type { NextApiRequest, NextApiResponse } from 'next'
import { database as db } from "../../firebase/firebase.js"
import { ref, push, set, get, query, limitToFirst, orderByKey, startAt, startAfter } from "firebase/database"
import { getToken, getUserIDByToken } from "../../firebase/utils/loginTokenUtils.js"
import { generateBase64 } from "../../services/imageServices.js"
import { uploadPostThumbnailFromBase64 } from "@firebase/utils/uploadUtils";
import { getDownloadUrlFromPath } from '@firebase/utils/downloadUtils';
import multer from "multer";
import nc from "next-connect";

type Data = {
    authorID?: string,
    title?: string,
    body?: string,
    thumbnail?: string,
    date?: Date,
    message?: string
}

async function postListHandler(title: string, body: string, thumbnail: string, authorID: string, date: string) {
    const postListRef = ref(db, '/postList');
    const newPostRef = await push(postListRef);

    await uploadPostThumbnailFromBase64(thumbnail, newPostRef.key);
    const downloadURL = await getDownloadUrlFromPath(`post-thumbnails/${newPostRef.key}`)
    await set(newPostRef, { title, body, thumbnail: downloadURL, authorID, date });
    return newPostRef.key;
}

async function usersPostListHandler(authorID: string, postKey: string) {
    const newUsersPostRef = ref(db, '/usersPostList/' + authorID + '/' + postKey);
    await set(newUsersPostRef, true);
}

const postHandler = nc<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry something happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method "${req.method}" not allowed!` });
    },
})

postHandler.use(multer().any());

postHandler.get(async (req, res) => {
    try {

        const { startKey, num } = req.query;
        let postListRef = query(ref(db, '/postList'), startAt(String(startKey)), limitToFirst(Number(num)), orderByKey());
        const snapshot = await get(postListRef);
        // console.log(snapshot.val());

        if (snapshot.exists()) {
            return res.status(200).json(snapshot.val());
        }
        return res.status(404).json({ message: "No Post Found" });
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "No Post Found" });
    }
})

postHandler.post(async (req, res) => {
    try {
        const token = getToken(req);
        // console.log(req.headers['authorization']);

        if (!token) {
            return res.status(401).json({ message: "token missing or invalid" });
        }

        const { title, body } = req.body;

        const date = new Date();

        const userID = await getUserIDByToken(token);
        let thumbnail;

        if (req.files && req.files.length > 0) {
            thumbnail = req.files[0].buffer.toString('base64');
        } else {
            thumbnail = await generateBase64(body, "1024x1024");
            // thumbnail now in base64 if successful. Else null.
            // Do some magic to turn it into url?
        }

        const postKey = await postListHandler(title, body, thumbnail, userID, date.toString());
        await usersPostListHandler(userID, postKey || "INVALID KEY");

        res.status(201).send({ authorID: userID, title, body, thumbnail, date });
    } catch {
        res.status(400).send({ message: 'Invalid body parameters' });
    }
})

export const config = {
    api: {
        bodyParser: false,
    },
}

export default postHandler;
