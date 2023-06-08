import { db } from "./../firebase.config";
import { useCallback } from "react";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { BillsACtions } from './../redux/slices/billsSlice';

export const useBillsApi = () => {
    const dispatch = useDispatch();
    const getBills = useCallback(async () => {
      const billsCollection = collection(db, "bills");
      const billsSnapshot = await getDocs(billsCollection);
      const billsList = billsSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch(BillsACtions.setAllBills(billsList));
    }, [dispatch]);
    return getBills;
  };
  