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

export async function register(email, password, username, avatar) {
    console.log({email, password, username, avatar})

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("avatar", avatar);

    //const obj = { email: email, password: password, username: username, avatar: avatar };
    //console.log("obj", obj);
    try {
        const response = await axios.post('/api/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.log("err", err.response);
    }
}