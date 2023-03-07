import { useCallback } from 'react';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { db } from './../firebase.config';
import { useDispatch } from 'react-redux';
import { productsACtions } from './../redux/slices/productsSlice';

export const useCategoryApi = () => {
    const dispatch = useDispatch()
    const getCategories = useCallback(async () => {
        const categoryCollection = collection(db, "catogory");
        const categorySnapshot = await getDocs(categoryCollection);
        const categoryList = categorySnapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
    
        dispatch(productsACtions.setCategory(categoryList));
      }, [dispatch]);
  return (
    getCategories
  )
}
