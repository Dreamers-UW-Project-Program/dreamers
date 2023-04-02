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
	await uploadString(profileImageRef, dataUrl, 'data_url').then((snapshot) => {
		console.log('Uploaded a data_url string!');
	});
}

export const uploadProfileImageFromFile = async (file, imageName) => {
	const profileImageRef = ref(storage, `user-profile-images/${imageName}`);
	uploadBytes(profileImageRef, file).then((snapshot)=> {
		console.log('Uploaded a blob or file!');
	})
}

export const uploadProfileImageFromBase64 = async (base64, imageName) => {
	const profileImageRef = ref(storage,  `user-profile-images/${imageName}`);
	await uploadString(profileImageRef, base64, 'base64').then((snapshot) => {
		console.log('Uploaded a base64 string!');
	});
}

export const uploadProfileImageFromBase64url = async (base64url, imageName) => {
	const profileImageRef = ref(storage,  `user-profile-images/${imageName}`);
	await uploadString(profileImageRef, base64url, 'base64url').then((snapshot) => {
		console.log('Uploaded a base64 string!');
	});
}

export const uploadProfileImageFromDataUrl = async (dataUrl, imageName) => {
	const profileImageRef = ref(storage,  `user-profile-images/${imageName}`);
	await uploadString(profileImageRef, dataUrl, 'data_url').then((snapshot) => {
		console.log('Uploaded a base64 string!');
	});
}

export const uploadPostThumbnailFromBase64 = async (base64, imageName) => {
	const profileImageRef = ref(storage,  `post-thumbnails/${imageName}`);
	await uploadString(profileImageRef, base64, 'base64').then((snapshot) => {
		console.log('Uploaded a base64 string!');
	});
}