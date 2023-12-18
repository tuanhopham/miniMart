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
export const RevenueModal = ({ profit, isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size='lg' >
      <ModalHeader toggle={toggle}>profit Detail</ModalHeader>
      <ModalBody>
      <Table centered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>sale</th>
              <th>Quantity</th>
              <th>total Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {profit.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.sale}</td>
                <td>{item.totalQty}</td>
                <td>{item.totalAmount}</td>
                <th>{moment(item.date).format("DD/MM/YYYY")}</th>
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
