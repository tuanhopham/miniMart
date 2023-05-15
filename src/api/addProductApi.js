import { db } from "./../firebase.config";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const checkDuplicateDocumentId = async (collectionName, documentId) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.some((doc) => doc.id === documentId);
};

export const addProductApi = async (product) => {
  try {
    const isDuplicate = await checkDuplicateDocumentId(
      "products",
      product.productName
    );
    if (isDuplicate) {
      toast.error(`Name existed in data`);
    } else {
      await setDoc(doc(db, "products", product.productName), product);
      toast.success(`added`);
    }
  } catch (error) {
    toast.error(`error server ${error}`);
  }
};
