import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Label,
  Button,
} from "reactstrap";
import moment from "moment";
export const ViewBill = ({ bills, isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>bills Detail</ModalHeader>
      <ModalBody>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bills &&
              bills.carts &&
              bills.carts.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.totalPrice}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <br />
    
        {bills &&bills.timeline && bills.timeline.length > 0 && (
          <>
          <Label xxl>timeline</Label>
          <Table striped>
         
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {bills.timeline.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{moment(item.time).format("DD/MM/YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </>
        )}
        <div>
          <p>Customer Information:</p>
          <p>Name: {bills.displayName}</p>
          <p>Address: {bills.address}</p>
          <p>City: {bills.city}</p>
          <p>Phone Number: {bills.phoneNumber}</p>
          <p>Email: {bills.email}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle} modal={isOpen.toString()}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
