import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

/* 
*  returns a download url, which can be used as described in 
*  https://firebase.google.com/docs/storage/web/download-files#download_data_via_url
*/ 
export const getDownloadUrlFromPath = async (path) => {
	const pathReference = ref(storage, path);
	const url = await getDownloadURL(pathReference);
	return url;
}

export const getAllFilesFromFolderUrl = async (folderUrl) => {
	const folderRef = ref(storage, folderUrl);
	// Find all the prefixes, items and return them
	listAll(folderRef).then((res) => {
			return res;
		}).catch((error) => {
			console.log(error.code);
		});
}