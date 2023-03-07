import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { useEffect } from "react";
import { useProductApi } from "./api/productApi";
import { useCategoryApi } from "./api/categoryApi";

function App() {
  const fetchProducts = useProductApi();
  const fetchCategorys = useCategoryApi();
  useEffect(() => {
    fetchProducts();
    fetchCategorys();
  }, [fetchProducts, fetchCategorys]);

  return <Layout />;
}

export default App;
