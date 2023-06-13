import moment from "moment";
import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table
} from "reactstrap";
export const TotalAddProductModal = ({ listProductsAdd, isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered  size='lg'>
      <ModalHeader toggle={toggle}>addded Product Detail</ModalHeader>
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
            {listProductsAdd.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.Price}</td>
                <td>{item.priceOfProduct}</td>
                <th>{moment(item.time).format("DD/MM/YYYY")}</th>
              </tr>
            ))}
          </tbody>
        </Table>
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
