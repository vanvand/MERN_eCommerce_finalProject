import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
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
    const [ image, setImage ] = useState("")
    const [ category, setCategory ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ uploading, setUploading ] = useState(false) // similar to loading in redux > set to true before we make our request and set to false when request is done

    const dispatch = useDispatch()
    
    const productDetails = useSelector((state) => {
        console.log("state", state.productDetails);
        return state.productDetails
    })
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
            console.log('product',product)
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setImage(product.image)
                setCategory(product.category)
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

            setImage(data) // data is image path
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
            image,
            category,
            description,
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
        
                <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        {/* Form.File not longer supported by react-bootstrap 5 */}
                        <Form.Control
                            type="file"
                            // id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                            multiple
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

