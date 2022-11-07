import React from "react";
import {Card, Col, Row } from "react-bootstrap";


export default function MainAdd() {
  return (
    <>
      <Card bg="dark" border="light">
        <Row className="flex-column-reverse flex-md-row  align-items-center mainAddCard">
          <Col  className="mainAddCol">
            <Card.Img
              variant="bottom"
              src="../../../uploads/hero-banner.png"
              className="add_image"
            />
            {/* <Card.ImgOverlay>
              <ListGroup variant="flush">
                <ListGroup.Item className="mainAddListGroup">
                  <h1>Keep Life Simple</h1>
                </ListGroup.Item>

                <ListGroup.Item className="mainAddListGroup">
                  {" "}
                  <h5>We are community-bases rental service</h5>
                </ListGroup.Item>
              </ListGroup>
            </Card.ImgOverlay> */}
          </Col>
 
        </Row>
      </Card>
    </>
  );
}


   