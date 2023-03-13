import { ref, uploadString, listAll } from "firebase/storage";
import { storage } from "../firebase";

export const toDataURL = async (url) => {
	let blob = await fetch(url).then(r => r.blob());
    let dataUrl = await new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
	return dataUrl;
}

export const uploadProfileImageFromUrl = async (url, imageName) => {
	const profileImageRef = ref(storage, `user-profile-images/${imageName}`);
	const dataUrl = await toDataURL(url);	
	console.log(dataUrl);
	uploadString(profileImageRef, dataUrl, 'data_url').then((snapshot) => {
		console.log('Uploaded a data_url string!');
	});
}

export const uploadProfileImageFromFile = async (file, imageName) => {
	const profileImageRef = ref(storage, `user-profile-images/${imageName}`);
	uploadBytes(profileImageRef, file).then((snapshot)=> {
		console.log('Uploaded a blob or file!');
	})
}

export const getAllFilesFromFolderUrl = async (folderUrl) => {
	const folderRef = ref(storage, folderUrl);
	// Find all the prefixes, items and return them
	listAll(listRef).then((res) => {
			return res;
		}).catch((error) => {
			console.log(error.code);
		});
}