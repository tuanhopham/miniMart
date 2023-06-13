import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { addProductApi } from "../../api/addProductApi";
import { uploadFiles } from '../../api/uploadImagesApi';
import { productsACtions } from '../../redux/slices/productsSlice';

export const AddProducts = (props) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const categorys = useSelector((state) => state.products.categorys);
  const [materialsList, setMaterialsList] = useState(null);
  const [typeList, setTypeList] = useState(null);
  const [sizeList, setSizeList] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    material: "",
    type: "",
    size: " ",
    price: 0,
    quality: 0,
    description: "",
    shortDesc: "",
    reviews:[],
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
      const imgUrl=  await uploadFiles(selectedFiles.map(e => e.file))
     const data = {
      ...formData,
      id: uuidv4(),
      imgUrl
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
    setSelectedFiles([]);
      dispatch(productsACtions.addProducts(data));

      addProductApi(data);
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

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files);
    const newSelectedFiles = await Promise.all(
      files.map(async (file) => ({
        file: file,
        thumbnail: await getThumbnailFromImageFile(file),
        id: uuidv4(),
      }))
    );
    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      ...newSelectedFiles,
    ]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setSelectedFiles(selectedFiles.filter((file) => file !== fileToRemove));
  };

  const readImageFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const getThumbnailFromImageFile = async (file) => {
    const imageDataUrl = await readImageFile(file);
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scaleFactor = 50 / img.height;
        canvas.width = img.width * scaleFactor;
        canvas.height = 50;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const thumbnailDataUrl = canvas.toDataURL();
        resolve(thumbnailDataUrl);
      };
      img.src = imageDataUrl;
    });
  };
  
  
  return (
    <div>
      <Form>
        <Modal isOpen={props.modal} toggle={props.toggle} size="lg">
          <ModalHeader toggle={props.toggle}>Add Product</ModalHeader>
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
                    name="select"
                    id="selectSize"
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
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input
                type="file"
                name="file"
                id="exampleFile"
                multiple
                onChange={handleFileSelect}
              />
              <FormText color="muted">Chọn nhiều ảnh</FormText>
            </FormGroup>
            <div>
              {selectedFiles.map((file) => (
                <div
                  key={file.id}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={file.thumbnail}
                    alt={file.file.name}
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "contain",
                    }}
                  />
                  <Label>{file.file.name}</Label>

                  <div style={{ marginLeft: "auto" }}>
                    <button
                      onClick={() => handleRemoveFile(file)}
                      className="buy_btn"
                    >
                      Delete
                    </button>
                  </div>
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
