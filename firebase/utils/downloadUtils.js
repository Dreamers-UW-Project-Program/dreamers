import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

/* 
*  returns a download url, which can be used as described in 
*  https://firebase.google.com/docs/storage/web/download-files#download_data_via_url
*/ 
export const getDownloadUrlFromPath = async (path) => {
	const pathReference = ref(storage, path);
	getDownloadURL(pathReference).then((url) => {
		return url;
	}).catch((error) => {
		console.log(error.code);
	});
}