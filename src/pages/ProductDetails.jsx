import React, { useState, useRef, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";

import Helmet from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import { ProductsList } from "./../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartACtions } from "./../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//setting react slider
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
export const ProductDetails = () => {
  const products = useSelector((state) => state.products.productsList);
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  
  // review of user
  const reviewUser = useRef("");
  const reviewMsg = useRef("");

  const product = products.find((item) => item.id === id);
  const {productName,imgUrl,category,shortDesc,reviews,description,price} = product
  const relatedProducts = products.filter(
    (item) => item.category === products.category && item !== product
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    toast.success("Review submitted");
  };

  const addToCart = () => {
    dispatch(
      cartACtions.addItem({
        id,
        image: products.imgUrl[0],
        productName: products.productName,
        price: products.price,
      })
    );
    toast.success(`add ${products.productName} successfully`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

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
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-s-fill"></i>
                      </span>
                      <span>
                        <i class="ri-star-half-s-fill"></i>
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
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy_btn"
                  onClick={addToCart}
                >
                  Add to cart
                </motion.button>
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
                        <form action="" onSubmit={handleSubmit}>
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
                              1<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(2)}
                            >
                              2<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(3)}
                            >
                              3<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(4)}
                            >
                              4<i class="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(5)}
                            >
                              5<i class="ri-star-s-fill"></i>
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
              <Col lg="12" className="mt-5">
                <h2 className="related__title">You might also like</h2>
              </Col>
              <ProductsList data={relatedProducts} />
            </Row>
          </Container>
        </section>
      </Helmet>
    )
  );
};
