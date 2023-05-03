import { motion } from "framer-motion";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Button, Col, Container, Form, Modal, Row } from "reactstrap";
import Helmet from "./../components/Helmet/Helmet";
import { AddProducts } from './AddProducts'

export const AllProducts = () => {
  const [modal, setModal] = useState(false);


 
  const toggle = () => setModal(!modal);


  // Số sản phẩm hiển thị trên mỗi trang
  const productsPerPage = 10;

  // Vị trí sản phẩm bắt đầu hiển thị trên trang hiện tại
  const [productOffset, setProductOffset] = useState(0);

  // Vị trí sản phẩm kết thúc hiển thị trên trang hiện tại
  const endOffset = productOffset + productsPerPage;

  // Lấy danh sách sản phẩm từ Redux Store
  const products = useSelector((state) => state.products.productsList);

  // Lấy danh sách sản phẩm hiện tại trên trang
  const currentProducts = products.slice(productOffset, endOffset);

  // Tính số trang hiển thị
  const pageCount = Math.ceil(products.length / productsPerPage);

  // Hàm xử lý khi người dùng chuyển trang
  const handlePageClick = (event) => {
    // Tính vị trí sản phẩm bắt đầu hiển thị trên trang mới
    const newOffset = (event.selected * productsPerPage) % products.length;

    // In ra console để kiểm tra
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );

    // Cập nhật vị trí sản phẩm bắt đầu hiển thị trên trang mới
    setProductOffset(newOffset);
  };

  return (
    <div>
      <Helmet title="Cart">
        <section>
          <Container>
            <Row>
              <Col lg="10">
                {currentProducts.length === 0 ? (
                  <h2 className="fs-4 text-center">
                    No item added to the cart
                  </h2>
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
                      {currentProducts.map((product, index) => (
                        <tr>
                          <td>
                            <img src={product.imgUrl[0]} alt="" />
                          </td>
                          <td>{product.productName}</td>
                          <td>${product.price}</td>
                          <td>{product.quality}</td>
                          <td>
                            <motion.i
                              // onClick ={deleteProduct}
                              whileTap={{ scale: 1.2 }}
                              class="ri-delete-bin-line"
                            ></motion.i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Col>
              <Col lg="2">
              
              <div>
                <motion.button whileHover={{ scale: 1.1 }}  onClick={toggle} className="buy_btn w-100 p-3">Add Product</motion.button>
              </div>
            </Col>
            </Row>
          </Container>
        </section>
      </Helmet>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
   <AddProducts toggle={toggle} modal={modal}/>
    </div>
  );
};
