import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { createSearch } from "../actions/mostSearchActions";
import { MOSTSEARCH_CREATE_SAVE } from "../constants/mostSearchConstants.js";

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: MOSTSEARCH_CREATE_SAVE });
  }, [dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/productssearch/${keyword}`);
      dispatch(createSearch(keyword));
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="search"
    >
      <InputGroup >
        <Button
          type="submit"
          variant="outline"
          bg="light"
          className="btn-search"
        >
          {/* search icon */}
          <BsSearch  style={{ strokeWidth: "1"}} />
        </Button>

        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            boxShadow: "none",
            backgroundColor: "transparent",
            outline: "0",
            padding: "0.25rem",
            width: "15rem"
          }}
        />
       
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
