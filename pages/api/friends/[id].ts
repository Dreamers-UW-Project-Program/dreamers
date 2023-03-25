import type { NextApiRequest, NextApiResponse } from 'next'
import { database as db } from "../../../firebase/firebase.js"
import { ref, get, remove, set } from "firebase/database"
import { getToken, getUserIDByToken } from "../../../firebase/utils/loginTokenUtils.js"

type Data = {
    message?: string,
    foundFriend?: boolean
}

export default async function friendsHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        try {
            const { id, friendID } = req.query;

            const token = getToken(req);

            if (!token) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            const userID = await getUserIDByToken(token);

            if (userID != id) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            if (!friendID) {
                const userListRef = ref(db, `/friendList/${id}`);
                const snapshot = await get(userListRef);

                if (snapshot.exists()) {
                    return res.status(200).json(snapshot.val());
                }
                res.status(404).json({ message: "User Not Found" });
            } else {
                const userSpecificFriendRef = ref(db, `/friendList/${id}/${friendID}`);
                const snapshot = await get(userSpecificFriendRef);

                if (snapshot.exists()) {
                    return res.status(200).json({ foundFriend: true });
                }
                res.status(200).json({ foundFriend: false });
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Invalid Request" });
        }
    } else if (req.method == "POST") {
        try {
            const { id, friendID } = req.query;

            const token = getToken(req);

            if (!token) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            const userID = await getUserIDByToken(token);

            if (userID != id) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            const friendRef = ref(db, `/userList/${friendID}`);
            const snapshot = get(friendRef);
            if (!(await snapshot).exists()) {
                return res.status(400).send({ message: "Friend Invalid" });
            }

            const newFriendRef = ref(db, `/friendList/${id}/${friendID}`);

            await set(newFriendRef, true);

            res.status(201).send({ message: "Friend Added" });

        } catch (err) {
            console.log(err);
            res.status(400).send({ message: "Invalid Request" });
        }

    } else if (req.method === "DELETE") {
        try {
            const { id, friendID } = req.query;

            const token = getToken(req);

            if (!token) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            const userID = await getUserIDByToken(token);

            if (userID != id) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            const badFriendRef = ref(db, `/friendList/${id}/${friendID}`)

            const snapshot = await get(badFriendRef);

            if (!snapshot.exists()) {
                return res.status(404).json({ message: "Friend Not Found" });
            }

            await remove(badFriendRef);

            res.status(200).json({ message: "Delete Successful" });

        } catch (err) {
            console.log(err);
            res.status(400).send({ message: "Invalid Request" });
        }
    } else {
        res.status(405).send({ message: 'Only GET and POST requests allowed' });
    }

}