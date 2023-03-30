import type { NextApiRequest, NextApiResponse } from 'next'
import { database as db } from "../../../firebase/firebase.js"
import { ref, get, remove, set } from "firebase/database"
import { getToken, getUserIDByToken } from "../../../firebase/utils/loginTokenUtils.js"

type Data = {
    message?: string,
}

export default async function usersHandler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "GET") {
        try {
            const { id } = req.query;

            const token = getToken(req);

            if (!token) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            const userID = await getUserIDByToken(token);

            if (userID != id) {
                return res.status(401).json({ message: "token missing or invalid" });
            }

            const userRef = ref(db, `/userList/${id}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                return res.status(200).json(snapshot.val());
            }

            res.status(404).json({ message: "User Not Found" });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Invalid Request" });
        }
    } else {
        res.status(405).send({ message: 'Only GET requests allowed' });
    }

}