import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./../../firebase.config";



export const getDataUserBillsApi = async (billsID) => {
  try {
   const userBills = await getDoc(doc(db, "bills"));
    return userBills; 
  } catch (error) {
    return []; 
  }
};

export const getUserIdBillApi = async (email) => {
  try {
    const docRef = doc(db, "users", email);
    const user = await getDoc(docRef);
    const billIdOfuser = user.data()?.bills ? user.data()?.bills : [];
    return billIdOfuser;
  } catch (error) {
    toast.error(`Error get cart: ${error}`);
    return [];
  }
};