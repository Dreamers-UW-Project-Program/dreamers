import axios from "axios";

export async function addFriend(id, friendID, token){
	//const data = {id, friendID };
	// console.log(token)
	// console.log(`/api/friends/${id}/?friendID=${friendID}`)
	try {
		const response = await axios.post(`/api/friends/${id}/?friendID=${friendID}`, {}, {
			headers: {
				'authorization': `bearer ${token}`
			}
		});

		if (response.status == 201){
			console.log("success", response)
			return true;
		};
		return false;
	} catch (e) {
		console.log(e.response);
		return false;
	}
}