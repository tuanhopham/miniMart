import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { updateOrderEntryApi, updateQuantityApi } from "../../api/editProductApi";
import { useProductApi } from './../../api/productApi';

export const AddQuantity = (props) => {
  const fetchProducts = useProductApi();
  const [quantity, setQuantity] = useState(0);
  const [Price, setPrice] = useState(0);
  const [priceOfProduct, setPriceOfProduct] = useState(0);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
   if(priceOfProduct<props.product.price){
  const isUpdateQuantity =  updateQuantityApi({...props.product, quality: Number(props.product.quality) + quantity });
    if(isUpdateQuantity){
      updateOrderEntryApi({Price, quantity,priceOfProduct,time:Date.now(), productName:props.product.productName});
      props.toggle();
      fetchProducts();
    }
  }
  else{
    toast.error(`The import price cannot be higher than the selling price`);
  }
  };
  useEffect(() => {
    const priceOfProduct = Price / quantity;
    setPriceOfProduct(Number(priceOfProduct.toFixed(2)));
  }, [quantity, Price]);
  useEffect(() => {
    setQuantity(0)
    setPrice(0)
  }, [props]);

  return (
    <div>
      <Form>
        <Modal centered isOpen={props.modal} toggle={props.toggle} size="m">
          <ModalHeader toggle={props.toggle}>
            Add quantity of {props.product.productName}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">
                1 {props.product.productName} = {priceOfProduct>0&&priceOfProduct}$
              </Label>
              <br></br>
              <br></br>
              <Label for="enterquantity">enter quantity</Label>

              <Input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="enterquantity"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                min="1"
                required
              />
              <Label for="enter price">enter price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="enter price"
                value={Price}
                onChange={(event) => setPrice(Number(event.target.value))}
                min="1"
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Accept
            </Button>
            <Button color="secondary" onClick={props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    </div>
  );
};
