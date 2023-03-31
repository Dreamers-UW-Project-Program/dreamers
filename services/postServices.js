import axios from 'axios'

export async function likePost(postID, userID, token) {

    const data = { postID, userID, like: true }
    try {
        const response = await axios.post(`/api/posts/${postID}`, data, {
            headers: {
                'authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status == 201) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export async function commentPost(postID, userID, token, comment) {
    const data = { postID, userID, like: false, comment }
    try {
        const response = await axios.post(`/api/posts/${postID}`, data, {
            headers: {
                'authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status == 201) {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }

}

export async function makePost(title, body, thumbnail, token){
    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("thumbnail", thumbnail);

    try {
        const response = await axios.post(`/api/post`, formData, {
            headers: {
                'authorization': `bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response.status == 201) {
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}