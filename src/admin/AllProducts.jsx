import { motion } from "framer-motion";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Button, Col, Container, Form, Modal, Row } from "reactstrap";
import Helmet from "./../components/Helmet/Helmet";
import { AddProducts } from "./product/AddProducts";
import { EditProducts } from "./product/EditProducts";
import { deleteProductApi } from "../api/deleteProductApi";
import { useDispatch } from "react-redux";
import { productsACtions } from "./../redux/slices/productsSlice";
import './stylesAdmin/pagination.css';
export const AllProducts = () => {
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [product, setproduct] = useState({});
  const handleEdit = (e) => {
    setproduct(e);
    toggleEdit();
  };

  const toggle = () => setModal(!modal);
  const toggleEdit = () => setModalEdit(!modalEdit);

  // Số sản phẩm hiển thị trên mỗi trang
  const productsPerPage = 5;

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

    // Cập nhật vị trí sản phẩm bắt đầu hiển thị trên trang mới
    setProductOffset(newOffset);
  };
  const dispatch = useDispatch();
  const deleteProduct = async (product) => {
    if (product) {
      const check = await deleteProductApi(product?.productName);
      check &&   dispatch(productsACtions.deleteProduct(product));
    }
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
                        <th className="d-flex justify-content-around">Func</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProducts.map((product, index) => (
                        <tr className="align-middle">
                          <td>
                            <img src={product.imgUrl[0]} alt="" />
                          </td>
                          <td>{product.productName}</td>
                          <td>${product.price}</td>
                          <td>{product.quality}</td>
                          <td>
                            <motion.i
                              onClick={() => deleteProduct(product)}
                              style={{ fontSize: 20 }}
                              whileTap={{ scale: 1.2 }}
                              className="ri-delete-bin-line"
                            ></motion.i>
                            <motion.i
                              onClick={() => handleEdit(product)}
                              style={{ float: "right", fontSize: 20 }}
                              whileTap={{ scale: 1.2 }}
                              className="ri-edit-line"
                            >
                              {" "}
                            </motion.i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Col>
              <Col lg="2">
                <div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={toggle}
                    className="buy_btn w-100 p-3"
                  >
                    Add Product
                  </motion.button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>

     
      <ReactPaginate
      activeClassName={'item active '}
        breakClassName={'item break-me '}
        breakLabel="..."
        containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        nextClassName={"item next "}
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousClassName={"item previous"}
        pageClassName={'item pagination-page '}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    
      <AddProducts toggle={toggle} modal={modal} />

      <EditProducts toggle={toggleEdit} modal={modalEdit} product={product} />
    </div>
  );
};
