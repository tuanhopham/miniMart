import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Helmet from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import "../styles/product-details.css";
import { cartACtions } from "./../redux/slices/cartSlice";
import { useProductApi } from "../api/productApi";
import { updateOrderEntryApi, updateQuantityApi } from "../api/editProductApi";
import { AddQuantity } from "../admin/product/AddQuantity";
import { EditProducts } from "../admin/product/EditProducts";

//setting react slider
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
export const ProductQr = () => {
  const products = useSelector((state) => state.products.productsList);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [modalQuantity, setModalQuantity] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleQuantily = () => setModalQuantity(!modalQuantity);
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const role = useSelector((state) => state.user.role);
  // review of user
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const product = products.find((item) => item.id === id);
  let productName,
    imgUrl,
    category,
    shortDesc,
    reviews,
    description,
    price,
    quality;

  const fetchProducts = useProductApi();
  const [quantity, setQuantity] = useState(0);
  const [Price, setPrice] = useState(0);
  const [priceOfProduct, setPriceOfProduct] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (priceOfProduct < price) {
      const isUpdateQuantity = updateQuantityApi({
        ...product,
        quality: Number(quality) + quantity,
      });
      if (isUpdateQuantity) {
        updateOrderEntryApi({
          Price,
          quantity,
          priceOfProduct,
          time: Date.now(),
          productName: productName,
        });
        fetchProducts();
      }
    } else {
      toast.error(`The import price cannot be higher than the selling price`);
    }
  };
  useEffect(() => {
    const priceOfProduct = Price / quantity;
    setPriceOfProduct(Number(priceOfProduct.toFixed(2)));
  }, [quantity, Price]);
  if (product) {
    ({
      productName,
      imgUrl,
      category,
      shortDesc,
      reviews,
      description,
      price,
      quality,
    } = product);
  }

  const handleSubmitReview = (e) => {
    e.preventDefault();
    toast.success("Review submitted");
  };

  const addToCart = () => {
    product &&
      dispatch(
        cartACtions.addItem({
          id: product.id,
          imgUrl: product.imgUrl?.[0],
          productName: product.productName,
          price: product.price,
        })
      );

    toast.success(`add ${products.productName} successfully`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);
  console.log(role);
  return (
    product && (
      <Helmet title={productName}>
        <CommonSection title={productName} />

        <section className="pt-0">
          <Container>
            <Row>
              <Col lg="6">
                <Slider {...settings}>
                  {imgUrl.map((item, index) => (
                    <img key={index} src={item} alt="" />
                  ))}
                </Slider>
              </Col>
              <Col lg="6">
                <div className="product__details">
                  <h2>{productName}</h2>
                  <div
                    className="product__rating d-flex align-items-center
              gap-5 mb-3"
                  >
                    <div>
                      <span>
                        <i className="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i className="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i className="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i className="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i className="ri-star-half-s-fill"></i>
                      </span>
                    </div>

                    <p>
                      (<span>{3}</span> ratings)
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category.toUpperCase()} </span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                {role === "sale" ? (
                  <>
                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      className="buy_btn"
                      style={{ marginRight: 20 }}
                      onClick={() => setModalEdit(!modalEdit)}
                    >
                      Edit Product
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      className="buy_btn"
                      style={{ backgroundColor: "ThreeDHighlight" }}
                      onClick={() => setModalQuantity(!modalQuantity)}
                    >
                      Add quantity
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    className="buy_btn"
                    onClick={addToCart}
                  >
                    Add to cart
                  </motion.button>
                )}
              </Col>
            </Row>
          </Container>
        </section>
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className="tab__wrapper d-flex align-items-center gap-5">
                  <h6
                    className={`${tab === "desc" ? "active__tab" : ""}`}
                    onClick={() => setTab("desc")}
                  >
                    Description
                  </h6>
                  <h6
                    className={`${tab === "rev" ? "active__tab" : ""}`}
                    onClick={() => setTab("rev")}
                  >
                    Reviews ({reviews.length})
                  </h6>
                </div>
                {tab === "desc" ? (
                  <div className="tab__content mt-5">
                    <p>{description}</p>{" "}
                  </div>
                ) : (
                  <div className="product__review mt-5">
                    <div className="review__wrapper">
                      <ul>
                        {reviews?.map((item, index) => (
                          <li key={index} className="mb-4">
                            <h6>Jhon Doe</h6>
                            <span>{item.rating} (rating)</span>
                            <p>{item.text}</p>
                          </li>
                        ))}
                      </ul>
                      <div className="review__form">
                        <h4>Leave your experience</h4>
                        <form action="" onSubmit={handleSubmitReview}>
                          <div className="form__group">
                            <input
                              type="text"
                              placeholder="Enter Name"
                              ref={reviewUser}
                              required
                            />
                          </div>
                          <div className="form__group d-flex align-items-center gap-5 rating__group">
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(1)}
                            >
                              1<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(2)}
                            >
                              2<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(3)}
                            >
                              3<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(4)}
                            >
                              4<i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(5)}
                            >
                              5<i className="ri-star-s-fill"></i>
                            </motion.span>
                          </div>
                          <div className="form__group">
                            <textarea
                              rows={4}
                              type="text"
                              placeholder="Review Massage ..."
                              ref={reviewMsg}
                              required
                            />
                          </div>
                          <motion.button
                            whileTap={{ scale: 1.2 }}
                            type="submit"
                            className="buy_btn"
                          >
                            Submit
                          </motion.button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </section>

        <EditProducts toggle={toggleEdit} modal={modalEdit} product={product} />
        <AddQuantity
          toggle={toggleQuantily}
          modal={modalQuantity}
          product={product}
        />
      </Helmet>
    )
  );
};
