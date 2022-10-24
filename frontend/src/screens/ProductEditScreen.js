import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { listProductDetails, updateProduct } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants" 

const ProductEditScreen = () => {

    const params = useParams()
    const productId = params.id
    const navigate = useNavigate()

    const [ name, setName ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ image1, setImage1 ] = useState("")
    const [ image2, setImage2 ] = useState("")
    const [ image3, setImage3 ] = useState("")
    const [ brand, setBrand ] = useState("")
    const [ category, setCategory ] = useState("")
    const [ countInStock, setCountInStock ] = useState(0)
    const [ description, setDescription ] = useState("")
    const [ uploading, setUploading ] = useState(false) // similar to loading in redux > set to true before we make our request and set to false when request is done

    const dispatch = useDispatch()
    
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate

    useEffect( () => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
         } else {
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage1(product.image1)
                setImage2(product.image2)
                setImage3(product.image3)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [navigate, product, productId, dispatch, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0] // e.target.files is array > get first one
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true) // loading

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage1(data) // data is image path
            setImage2(data) // data is image path
            setImage3(data) // data is image path
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image1,
            image2,
            image3,
            brand,
            category,
            description,
            countInStock,
        })
        )
    }

  return (
    <>
        <Link to="/admin/productlist" className="btn btn-light my-3">
            Go Back
        </Link>

        <FormContainer>
        
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading
            ? <Loader />
            : error ? <Message variant="danger">{error}</Message>
            : (
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
        <Row>
            <Col>
                <Form.Group controlId='image1'>
                    <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image1}
                            onChange={(e) => setImage1(e.target.value)}
                            ></Form.Control>
                        {/* Form.File not longer supported by react-bootstrap 5 */}
                        <Form.Control
                            type="file"
                            // id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                            ></Form.Control>
                    {uploading && <Loader />}
            </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId='image2'>
                    <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image2}
                            onChange={(e) => setImage2(e.target.value)}
                            ></Form.Control>
                        {/* Form.File not longer supported by react-bootstrap 5 */}
                        <Form.Control
                            type="file"
                            // id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                            ></Form.Control>
                    {uploading && <Loader />}
            </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId='image3'>
                    <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image3}
                            onChange={(e) => setImage3(e.target.value)}
                            ></Form.Control>
                        {/* Form.File not longer supported by react-bootstrap 5 */}
                        <Form.Control
                            type="file"
                            // id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                            ></Form.Control>
                    {uploading && <Loader />}
            </Form.Group>
            </Col>
                            </Row>

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

                <Button type="submit" variant="primary">
                    Update
                </Button>

            </Form>
            )
        }
    </FormContainer>
    </>
    
  )
}

export default ProductEditScreen

