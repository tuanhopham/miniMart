import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./../firebase.config";


export const editProductApi = async (product) => {
  try {
    await setDoc(doc(db, "products", product.productName), product);
    toast.success(`Product edited successfully`);
    return true; 
  } catch (error) {
    toast.error(`Error editing product: ${error}`);
    return false; 
  }
};
