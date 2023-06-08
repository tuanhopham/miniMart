import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./../../firebase.config";

export const getDataUserBillsApi = async (billsID) => {
  try {
    const userBills = await Promise.all(
      billsID.map(async (billID) => {
        const docRef = doc(db, "bills", billID);
        const billData = await getDoc(docRef);
        return billData.data();
      })
    );

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
