import { useCallback } from "react";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "./../firebase.config";
import { useDispatch } from "react-redux";
import { productsACtions } from "./../redux/slices/productsSlice";

export const useProductApi = () => {
  const dispatch = useDispatch();
  const getProducts = useCallback(async () => {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    dispatch(productsACtions.setProducts(productsList));
  }, [dispatch]);
  return getProducts;
};
