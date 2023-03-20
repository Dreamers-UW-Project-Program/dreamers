require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getToken = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
}

const checkToken = (token, email) => {
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

