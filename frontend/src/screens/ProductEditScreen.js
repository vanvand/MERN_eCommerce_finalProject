import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imageSecond, setImageSecond] = useState("");
  const [imageThird, setImageThird] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false); // similar to loading in redux > set to true before we make our request and set to false when request is done

  const productDetails = useSelector((state) => {
    return state.productDetails;
  });
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
    } else {
      //console.log("product", product);
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      }
      if (product) {
        setName(product.name);
        setImage(product.image);
        setImageSecond(product.imageSecond);
        setImageThird(product.imageThird);
        setCategory(product.category);
        setDescription(product.description);
      }
    }
  }, [navigate, product, productId, dispatch, successUpdate]);

  const uploadImageHandler = async (e) => {
    const file = e.target.files[0]; // e.target.files is array > get first one
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true); // loading

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data); // data is image path
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadImageSecondHandler = async (e) => {
    const file = e.target.files[0]; // e.target.files is array > get first one
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true); // loading

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImageSecond(data); // data is image path
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const uploadImageThirdHandler = async (e) => {
    const file = e.target.files[0]; // e.target.files is array > get first one
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true); // loading

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImageThird(data); // data is image path

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        image,
        imageSecond,
        imageThird,
        category,
        description,
      })
    );
    navigate("/useradd");
  };

  return (
  
      <FormContainer>
        <h1>Edit Product</h1> 

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control
                type="file"
                // id='image-file'
                label="Choose File"
                custom
                onChange={uploadImageHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId="imageSecond">
              <Form.Label>Image Second</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageSecond}
                onChange={(e) => setImageSecond(e.target.value)}
              ></Form.Control>

              <Form.Control
                type="file"
                // id='image-file'
                label="Choose File"
                custom
                onChange={uploadImageSecondHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="imageThird">
              <Form.Label>image Third</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={imageThird}
                onChange={(e) => setImageThird(e.target.value)}
              ></Form.Control>

              <Form.Control
                type="file"
                // id='image-file'
                label="Choose File"
                custom
                onChange={uploadImageThirdHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

              <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" className="btn-custom-submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
 
  );
};

export default ProductEditScreen;
