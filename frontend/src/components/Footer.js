import React from "react";
import {Nav, Container, Row, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OffCanvas from "./footer/OffCanvas";
import {CommunityGuidelines, PrivacyPolicy, TermsOfUse} from "./footer/footerData";

const Footer = (props) => {
  return (
    <>
    <Container fluid className="footer-container">
        <Container className="footer-container-inner">

        {/* Logo */}
        <Row className="footer-logo">
          <Col >
            <Image
                    src="../../../uploads/logo-asone.png"
                    alt="footer-logo"
                    className="footer"
                    height="50vh"
                  />
          </Col>
        </Row>
        
        <Row className="footer-claim">
          <Col lg={5} md={8} sm={10}>
          <p>Share More, Buy Less - A community-based platform to lend and borrow from people around you.</p>
          </Col>
        </Row>

        {/* Links & Newsletter */}
        <Row className="footer-links">

          <Col md={2} sm={4}>
            <h4>Questions</h4>
            <ListGroup>
              <ListGroup.Item action 
                href="#"
                onClick={(e) => {
                  window.location.href = "mailto:feedback@asone.com";
                  e.preventDefault();
                }}
              >
                Contact Us
              </ListGroup.Item>
              <ListGroup.Item action href="/faq">
                FAQs
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3} sm={6}>
            <h4>Legal</h4>
            <ListGroup>
              <ListGroup.Item >
               <OffCanvas
                  name={PrivacyPolicy.name}
                  text={PrivacyPolicy.text}
                  title={PrivacyPolicy.title}
                />
              </ListGroup.Item>
              
              <ListGroup.Item >
                <OffCanvas
                  name={TermsOfUse.name}
                  text={TermsOfUse.text}
                  title={TermsOfUse.title}
                />
              </ListGroup.Item>
              <ListGroup.Item >
                <OffCanvas
                  name={CommunityGuidelines.name}
                  text={CommunityGuidelines.text}
                  title={CommunityGuidelines.title}
                />
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={6} sm={10}>
            <h4>Newsletter</h4>
             <Form className="newsletter-form d-grid">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="text-muted">
                  Sign up and get monthly updates from the asOne Community!
                </Form.Text>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Button className="btn-custom-cta btn-sign-up" type="submit">
                SIGN UP
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Social Media Links */}
        <Row>
          <Nav className="social-media-links">
             <Nav.Item>
              <Nav.Link to="#">
                <i className="fa-brands fa-instagram"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="#">
                <i className="fa-brands fa-facebook"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="#">
                <i className="fa-brands fa-twitter"></i>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="#">
                <i className="fa-brands fa-meetup"></i>
              </Nav.Link>
            </Nav.Item>
            </Nav>
        </Row>

      </Container>
    </Container>

    {/* Copyright */}
    <Container fluid className="copyright-container">
        <Row>
          <Col className="text-center m-0 p-1">Copyright &copy; asOne</Col>
        </Row>
    </Container>

    </>
  );
};
export default Footer;
