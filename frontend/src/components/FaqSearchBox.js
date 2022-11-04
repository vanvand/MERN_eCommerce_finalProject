import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const FaqSearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/faq/search/${keyword}`);
    } else {
      navigate("/faq");
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="search"
    >
      <InputGroup size="sm">

        <Button
          type="submit"
          variant="outline"
          className="btn-search"
          bg="light"
        >
           {/* search icon */}
          <BsSearch />
        </Button>

        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Faq..."
          style={{
            boxShadow: "none",
            backgroundColor: "transparent",
            outline: "0",
            padding: "0.25rem"
          }}
        />
      </InputGroup>
    </Form>
  );
};

export default FaqSearchBox;
