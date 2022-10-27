import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";

function OffCanvas({ name, title, text }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link to="#" onClick={handleShow} >
        {name}
      </Nav.Link>

      <Offcanvas show={show} onHide={handleClose} placement={"bottom"}>
        <Offcanvas.Header closeButton>
        
          <h5>{title}</h5>
        </Offcanvas.Header>
        <Offcanvas.Body>{text}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
