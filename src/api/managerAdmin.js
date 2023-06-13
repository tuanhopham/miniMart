import { collection, getDocs } from "firebase/firestore";
import { db } from "./../firebase.config";

export const getStaticticalApi =async () => {
    const statisticalCollection = collection(db, "statistical");
    const statisticalSnapshot = await getDocs(statisticalCollection);
    const statisticalList = statisticalSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return statisticalList;
  };
  
