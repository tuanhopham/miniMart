import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,

} from "reactstrap";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { editProductApi } from "../../api/editProductApi";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { productsACtions } from '../../redux/slices/productsSlice';
import { useEffect } from "react";

export const EditProducts = (props) => {
  const categorys = useSelector((state) => state.products.categorys);
  const [materialsList, setMaterialsList] = useState(null);
  const [typeList, setTypeList] = useState(null);
  const [sizeList, setSizeList] = useState(null);
  const [formData, setFormData] = useState({
    id:"",
    productName: "",
    category: "",
    material: "",
    type: "",
    size: "0",
    price: 0,
    quality: 0,
    description: "",
    shortDesc: "",
    reviews: [],
    imgUrl:[],
  });
  const dispatch = useDispatch()
  const handleSubmit = async(e) => {
    e.preventDefault();
    const emptyFields = [];

    for (const key of Object.keys(formData)) {
      if (formData[key] === "") {
        emptyFields.push(key);
      }
    }
    
    if (emptyFields.length > 0) {
      const message = `Vui lòng điền đầy đủ thông tin cho các trường: ${emptyFields.join(", ")}.`;
      toast.error(message);

    } else {
     
     const data = {
      ...formData,
    
      
    }
    props.toggle();
    setFormData({
      productName: "",
      category: "",
      material: "",
      type: "",
      size: "0",
      price: 0,
      quality: 0,
      description: "",
      shortDesc: "",
      reviews:[],
    });
      
  const  check =  await editProductApi(data);
  check&&dispatch(productsACtions.setProduct(data));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleChangeNum = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: Number(value),
    }));
  };
  const handleFilterCategory = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    //nếu giá trị = "" cho tất cả filter = null để không hiện thị
    if (e.target.value === "") {
      setMaterialsList(null);
      setTypeList(null);
      setSizeList(null);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        type: "",
        material: "",
      }));
    } else {
      setMaterialsList(
        categorys.find((item) => item.name === e.target.value).material
      );
      setTypeList(
        categorys.find((item) => item.name === e.target.value).category
      );
      setSizeList(categorys.find((item) => item.name === e.target.value).size);
    }
  };



 
  useEffect(() => {
    
  if(props.product){
    console.log(categorys.find((item) => item.name === props.product.category))
  setFormData(props.product)
    setMaterialsList(
      categorys.find((item) => item.name === props.product.category)?.material
    );
    setTypeList(
      categorys.find((item) => item.name === props.product.category)?.category
    );
    setSizeList(categorys.find((item) => item.name === props.product.category)?.size);
  }
  }, [categorys, props.product])
  
  return (
    <div>
      <Form>
        <Modal isOpen={props.modal} toggle={props.toggle} size="lg">
          <ModalHeader toggle={props.toggle}>Edit Product</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="productName">Name</Label>
              <Input
                type="text"
                name="productName"
                id="productName"
                placeholder="name product"
                value={formData.productName}
                onChange={handleChange}
                readOnly
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">select Category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleFilterCategory}
              >
                <option value="">select Category</option>
                {categorys.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <div className="d-flex">
              {materialsList && (
                <FormGroup className="mx-n1  w-100">
                  <Label for="material">select material</Label>
                  <Input
                    type="select"
                    name="material"
                    id="material"
                    value={formData.material}
                    onChange={handleChange}
                  >
                    <option value="">Material</option>

                    {materialsList.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}

              {typeList && (
                <FormGroup className="mx-n1  w-100">
                  <Label for="type">select type</Label>
                  <Input
                    type="select"
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="">Type</option>
                    {typeList.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}

              {sizeList && (
                <FormGroup className="mx-n1 w-100">
                  <Label for="selectSize">select size</Label>
                  <Input
                    type="select"
                    name="size"
                    id="size"
                    value={formData.size}
                    onChange={handleChange}
                  >
                    <option value="">Size</option>

                    {sizeList.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              )}
            </div>
             <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="$"
                value={formData.price}
                onChange={handleChangeNum}
              />
            </FormGroup>

            <FormGroup>
              <Label for="setquality">quality</Label>
              <Input
                type="number"
                name="quality"
                id="quality"
                placeholder="set Quality"
                value={formData.quality}
                onChange={handleChangeNum}
              />
            </FormGroup>

            <FormGroup>
              <Label for="setDescription">description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleShort Desc">short Desc</Label>
              <Input
                type="textarea"
                name="shortDesc"
                id="shortDesc"
                value={formData.shortDesc}
                onChange={handleChange}
              />
            </FormGroup>
          
            <div>
             

              {formData.imgUrl&&formData.imgUrl.map((file) => (
                <div
                  key={file}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={file}
                    alt={file}
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "contain",
                    }}
                  />
                  <Label>{file}</Label>

                 
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Do Something
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
