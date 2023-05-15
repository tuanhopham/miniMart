import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./../firebase.config";


export const deleteProductApi = async (product) => {
  try {
    await deleteDoc(doc(db, "products", product));
    toast.success(`Product deleted   successfully`);
    return true; 
  } catch (error) {
    toast.error(`Error delelte product: ${error}`);
    return false; 
  }
};
