import moment from "moment";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

export const TotalAddProductModal = ({ listProductsAdd, isOpen, toggle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(listProductsAdd.length / itemsPerPage);

  // Get current page data
  const currentPageData = listProductsAdd
    .sort((a, b) => b.time - a.time)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>Added Product Detail</ModalHeader>
      <ModalBody>
        <Table centered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((item, index) => (
              <tr key={index}>
                <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.Price}</td>
                <td>{item.priceOfProduct}</td>
                <th>{moment(item.time).format("DD/MM/YYYY")}</th>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="w-fit mx-auto">
          <Button
            color="secondary"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            color="secondary"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
        <br />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} modal={isOpen.toString()}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
