import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { getUserDetails, updateUser } from "../actions/userActions"
import { USER_UPDATE_RESET } from "../constants/userConstants"
import { locationData } from "../locationData.js"

const UserEditScreen = () => {

    const params = useParams()
    const userId = params.id
    const navigate = useNavigate()

    const [ name, setName ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ image, setImage ] = useState("")
    const [ city, setCity ] = useState("")
    const [ district, setDistrict ] = useState("")
    const [ uploading, setUploading] = useState(false)
    const [ isAdmin, setIsAdmin ] = useState(false)

    const dispatch = useDispatch()
    
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    const availableDistrict = locationData.cities.find((c) => c.name === city)

    useEffect( () => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET})
            navigate("/admin/userlist")
        } else {
            // to fill in existing user Data fire of getUserDetails action
            if(!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setImage(user.image)
                setCity(user.city)
                setDistrict(user.district)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [successUpdate, navigate, user, userId, dispatch])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
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

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ 
            _id: userId, 
            name, 
            email, 
            image,
            city,
            district,
            isAdmin
        }))
    }

  return (
    <>
        <Link to="/admin/userlist" className="btn btn-light my-3">
            Go Back
        </Link>

        <FormContainer>
        
        <h1>User Profile</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading
            ? <Loader />
            : error ? <Message variant="danger">{error}</Message>
            : (
                 <Form onSubmit={submitHandler}>
        

                <Image src={image} rounded/>
        
                <Form.Group controlId='image'>
                    <Form.Label>Avatar</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter avatar image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <Form.Control
                            type="file"
                            label='Choose Avatar'
                            custom
                            onChange={uploadFileHandler}
                        ></Form.Control>
                    {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="name" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                </Form.Group>

                <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>

                <Form.Select value={city} onChange={(e) => setCity(e.target.value)}>
                    <option>Select City</option>
                    {locationData.cities.map((data, key) => {
                        return (
                            <option value={data.name} key={key}>
                                {data.name}
                            </option>
                            );
                        })}
                </Form.Select>

                <Form.Select value={district} onChange={(e) => setDistrict(e.target.value)}>
                    <option>Select District</option>
                    {availableDistrict?.district.map((data, key) => {
                    return (
                                <option value={data.name} key={key}>
                                {data}
                            </option>
                        );
                    })}
                </Form.Select>
            </Form.Group>
        
                <Form.Group controlId="isAdmin">
                    <Form.Check 
                        type="checkbox" 
                        label="Is Admin" 
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
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

export default UserEditScreen

