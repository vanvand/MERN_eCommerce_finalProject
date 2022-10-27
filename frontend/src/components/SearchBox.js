import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { BsSearch } from "react-icons/bs";
import "./components_css/searchBox.css";

const SearchBox = () => {

  const navigate = useNavigate()
  
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className=" border-bottom border-top space">
      <InputGroup size="sm" >
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
        />
        <Button
          type="submit"
          variant="outline"
          className="p-2 search_icon "
          bg="light"
        >
          <BsSearch  />
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBox