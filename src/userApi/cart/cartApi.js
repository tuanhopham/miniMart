import { doc, getDoc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "./../../firebase.config";
import { getAuth } from "firebase/auth";

export const getCartOfUserApi = async (email) => {
  try {
    const docRef = doc(db, "users", email);
    const user = await getDoc(docRef);
    const cartOfuser = user.data()?.cart ? user.data()?.cart : {};
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
};
export const saveOdersUser = async (cart, totalAmount, totalQuantily) => {
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
};
export const saveOderData = async (cart, totalAmount, totalQuantily) => {
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
};

export const addBillUserApi = async (bill) => {
  const auth = getAuth();
  try {
    if (auth.currentUser && auth.currentUser.email) {
      //xóa số lượng product trong bảng products
      bill.carts.forEach(async (cart) => {
        const docRef = doc(db, "products", cart.productName);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();
          const newQuality = productData.quality - cart.quantity;
          await updateDoc(docRef, {
            quality: newQuality,
          });
        }
      });

      await setDoc(doc(db, "bills", bill.billId), bill);
      const docRef = doc(db, "users", auth.currentUser.email);
      await updateDoc(docRef, {
        bills: arrayUnion(bill.billId),
      });
      toast.success(`order success`);
      return true;
    }
  } catch (error) {
    toast.error(`error server ${error}`);
  }
  return false;
};
export const getRoleOfUser = async (userId) => {
  try {
    const docRef = doc(db, "roles", 'sales');
    const listRoles = await getDoc(docRef);
    const roleOfUser = listRoles.data()?.auth.indexOf(userId)===-1?'user':'sale';
    return roleOfUser;
  } catch (error) {
    toast.error(`Error get cart: ${error}`);
    return "user";
  }
};