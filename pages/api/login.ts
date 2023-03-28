import type { NextApiRequest, NextApiResponse } from 'next'
import { encodeEmail, getUserByID, getUserID } from "../../firebase/utils/userUtils.js"

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

type Data = {
    userID?: string,
    token?: string,
    message?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method !== "POST") {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    try {
        const { email, password } = req.body;
        const encoded = encodeEmail(email);

        const userID = await getUserID(encoded);

        const user = await getUserByID(userID);

        const validLogin = user === null ? false : await bcrypt.compare(password, user.passHash);

        if (!validLogin) {
            return res.status(401).json({ message: 'Invalid login credentials' })
        }
        
        // uses RAW email, in ascii
        const token = jwt.sign(email, process.env.TOKEN_HASH);

        res.status(200).send({ token, userID });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: 'Invalid body parameters'});
    }

}
