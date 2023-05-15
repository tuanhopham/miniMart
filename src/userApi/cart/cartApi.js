import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./../../firebase.config";
import { getAuth } from "firebase/auth";

export const getCartOfUserApi = async (email) => {
  try {
    const docRef = doc(db, "users", email);
    const user = await getDoc(docRef);
    const cartOfuser = user.data()?.cart ? user.data()?.cart : {};
    console.log(cartOfuser);
    return cartOfuser;
  } catch (error) {
    toast.error(`Error get cart: ${error}`);
    return {};
  }
};
export const addCartUserApi = async (cart, totalAmount, totalQuantily) => {
  const cartCopy = JSON.parse(JSON.stringify(cart));
  const auth = getAuth();

  if (auth.currentUser && auth.currentUser.email) {
    const docRef = doc(db, "users", auth.currentUser.email);
    await updateDoc(docRef, {
      cart: {
        totalAmount,
        totalQuantily,
        cartItems: cartCopy,
      },
    });
  }
  // try {
  //   const docRef = doc(db, "users", email);
  //   const user = await getDoc(docRef);
  //   const cartOfuser = user.data()?.cart ? user.data()?.cart : [];
  //   return cartOfuser;
  // } catch (error) {
  //   toast.error(`Error get cart: ${error}`);
  //   return [];
  // }
};
