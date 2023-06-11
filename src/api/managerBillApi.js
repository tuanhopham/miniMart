import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./../firebase.config";

export const acceptBillApi = async (bill) => {
  try {
    await setDoc(doc(db, "bills", bill.billId), bill);
    toast.success(`Accept Bill successfully`);
    return true;
  } catch (error) {
    toast.error(`Error Accept Bill product: ${error}`);
    return false;
  }
};
export const deleteBillApi = async (bill) => {
  try {
    await setDoc(doc(db, "bills", bill.billId), bill);
    toast.success(`Delete Bill successfully`);
    return true;
  } catch (error) {
    toast.error(`Delete Accept Bill product: ${error}`);
    return false;
  }
};
