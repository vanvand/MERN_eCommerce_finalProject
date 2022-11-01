import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "./components_css/searchBox.css";
import { useDispatch, useSelector } from "react-redux";
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
      className=" border-bottom border-top space search"
    >
      <InputGroup size="sm">
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
          <BsSearch />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
