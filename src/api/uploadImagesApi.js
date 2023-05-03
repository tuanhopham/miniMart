import { getStorage, ref, uploadBytes,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";


export const uploadFiles = async (files) => {
  const promises = [];

  for (const file of files) {
    const fileName = file.name;
    const storageRef = ref(storage, `images/${fileName}`);
  
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURLPromise = getDownloadURL(snapshot.ref);
    
    promises.push(downloadURLPromise);
  }

  const urls = await Promise.all(promises);
  return urls;
};