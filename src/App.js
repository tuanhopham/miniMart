import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { useEffect } from "react";
import { useProductApi } from "./api/productApi";
import { useCategoryApi } from "./api/categoryApi";
import { getAuth } from "firebase/auth";
import { userACtions } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { getCartOfUserApi,getRoleOfUser } from "./userApi/cart/cartApi";
import { getUserIdBillApi,getDataUserBillsApi } from "./userApi/user/billApi";
import { cartACtions } from "./redux/slices/cartSlice";
import { BillsACtions } from './redux/slices/billsSlice';
function App() {
  const auth = getAuth();
  const fetchProducts = useProductApi();
  const fetchCategorys = useCategoryApi();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
    fetchCategorys();
  }, [fetchProducts, fetchCategorys]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
     
      if (user) {

        const roleUser = await getRoleOfUser(user.uid);
        console.log(roleUser);
        dispatch(
          userACtions.addUser({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role:roleUser,
          })
        );
        const UserCart = await getCartOfUserApi(user.email);
        const UserListBillId = await getUserIdBillApi(user.email);
        UserCart &&
          dispatch(
            cartACtions.setItem({
              cartItems: UserCart.cartItems,
              totalAmount: UserCart.totalAmount,
              totalQuantily: UserCart.totalQuantily,
            })
          );
          UserListBillId && UserListBillId.length > 0 && (
            await Promise.all([
              getDataUserBillsApi(UserListBillId),
            ]).then((ListBillsUser) => {
              dispatch(BillsACtions.setBills(ListBillsUser[0]));
            })
          );
      } else {
        dispatch(userACtions.deleteUser());
        dispatch(
          cartACtions.setItem({
            cartItems: [],
            totalAmount: 0,
            totalQuantily: 0,
          })
        );
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return <Layout />;
}

export default App;
