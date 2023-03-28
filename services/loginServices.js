import axios from 'axios'

export async function verifyPass({ email, password }) {

    const obj = { email, password };

    try {
        const response = await axios.post('/api/login', obj);
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

export async function register({ email, password, username, avatar }) {
    const obj = { email, password, username, avatar };

    try {
        const response = await axios.post('/api/register', obj);
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}