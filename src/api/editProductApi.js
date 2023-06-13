import { doc, setDoc ,updateDoc,arrayUnion} from "firebase/firestore";
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
export const updateQuantityApi = async (product) => {
  try {
    await setDoc(doc(db, "products", product.productName), product);
    toast.success(`Product add quantity successfully`);
    return true; 
  } catch (error) {
    toast.error(`Error add quantity product: ${error}`);
    return false; 
  }
};
export const updateOrderEntryApi = async (newEntry) => {
  try {
    await updateDoc(doc(db, "statistical", "orderEntry"), {
      entry: arrayUnion(newEntry)
  });

    return true; 
  } catch (error) {

    return false; 
  }
};
