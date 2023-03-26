import type { NextApiRequest, NextApiResponse } from 'next'
import { database as db } from "../../../firebase/firebase.js"
import { ref, get, remove } from "firebase/database"
import { getToken, getUserIDByToken } from "../../../firebase/utils/loginTokenUtils.js"

type Data = {
    message: string
}

export default async function postHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        try {
            const { postID } = req.query;
            //console.log(postID);

            const postListRef = ref(db, '/postList/' + postID);
            const snapshot = await get(postListRef);

            if (snapshot.exists()) {
                return res.status(200).json(snapshot.val());
            }
            return res.status(404).json({ message: "Post Not Found" });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Invalid Request" });
        }
    } else if (req.method === "DELETE") {
        try {
            const { postID } = req.query;

            const token = getToken(req);

            if (!token) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            const userID = await getUserIDByToken(token);

            if (!userID) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            const usersPostRef = ref(db, `/usersPostList/${userID}/${postID}`);

            const snapshot = await get(usersPostRef);

            if (!snapshot.exists()) {
                return res.status(404).json({ message: "Post Not Found"});
            }

            await remove(usersPostRef);

            const postRef = ref(db, '/postList/' + postID);
            await remove(postRef);

            res.status(200).json({ message: "Delete Successful"});

        } catch (err) {
            console.log(err);
            res.status(400).send({ message: "Invalid Request"});
        }
    } else {
        res.status(405).send({ message: 'Only GET and POST requests allowed' });
    }

}