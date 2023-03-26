import type { NextApiRequest, NextApiResponse } from 'next'
import { database as db } from "../../firebase/firebase.js"
import { ref, push, set, get } from "firebase/database"
import { getToken, getUserIDByToken } from "../../firebase/utils/loginTokenUtils.js"

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
    await set(newPostRef, { title, body, thumbnail, authorID, date });
    return newPostRef.key;
}

async function usersPostListHandler(authorID: string, postKey: string) {
    const newUsersPostRef = ref(db, '/usersPostList/' + authorID + '/' + postKey);
    await set(newUsersPostRef, true);
}

export default async function postHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === "GET") {

        try {
            const postListRef = ref(db, '/postList');
            const snapshot = await get(postListRef);

            if (snapshot.exists()) {
                return res.status(200).json(snapshot.val());
            }
            res.status(404).json({ message: "No Post Found"});
        } catch {
            res.status(404).json({ message: "No Post Found"});
        }

    } else if (req.method === "POST") {

        try {

            const token = getToken(req);
            // console.log(req.headers['authorization']);

            if (!token) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            const { title, body, thumbnail } = req.body;

            const date = new Date();

            const userID = await getUserIDByToken(token);

            const postKey = await postListHandler(title, body, thumbnail, userID, date.toString());
            await usersPostListHandler(userID, postKey || "INVALID KEY");

            res.status(201).send({ authorID: userID, title, body, thumbnail, date });
        } catch {
            res.status(400).send({ message: 'Invalid body parameters' });
        }


    } else {
        res.status(405).send({ message: 'Only GET and POST requests allowed' })
    }

}