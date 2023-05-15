import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/cart.css";
import Helmet from "./../components/Helmet/Helmet";
import { CommonSection } from "./../components/UI/CommonSection";
import { motion } from "framer-motion";
import { cartACtions } from "./../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const products = useSelector((state) => state.products.productsList);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();
  const checkAmount = async (cart) => {
    if (cart && products) {
      let hasProductExceedQuantity = false;

      for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];
        const productItem = products.find((item) => item.id === cartItem.id);

        if (cartItem.quantity > productItem.quality) {
          toast.error(
            `Sản phẩm "${productItem.productName}" có số lượng vượt quá hàng tồn kho.`
          );
          hasProductExceedQuantity = true;
        }
      }

      if (!hasProductExceedQuantity) {
        // navigate("/checkout");
        console.log(cart);
      }
    }
  };

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to the cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping will calculate in checkout
              </p>
              <div>
                <button
                  className="buy_btn w-100 "
                  onClick={() => checkAmount(cartItems)}
                >
                  Checkout
                </button>

                <button className="buy_btn w-100 mt-3">
                  <Link to="/shop">Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartACtions.deleteItem(item.id));
  };
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(
        cartACtions.changeQuantityItem({
          itemId: item.id,
          quantity: newQuantity,
        })
      );
    }
  };
  return (
    <tr>
      <td>
        <img src={item.image} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <input
        type="number"
        value={item.quantity}
        onChange={(event) =>
          handleQuantityChange(item, parseInt(event.target.value))
        }
      />
      <td>
        <motion.i
          onClick={deleteProduct}
          whileTap={{ scale: 1.2 }}
          className="ri-delete-bin-line"
        ></motion.i>
      </td>
    </tr>
  );
};
