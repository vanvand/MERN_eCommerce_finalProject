import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Email from "./footer/Email";
import OffCanvas from "./footer/OffCanvas";
import {
  CommunityGuidelines,
  PrivacyPolicy,
  TermsOfUse,
} from "./footer/footerData";
import { LinkContainer } from "react-router-bootstrap";

const Footer = (props) => {
  return (
    <Container>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="navbar_header "
      >
        <LinkContainer to="/">
          <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>
        <Nav variant="tabs">
          <Nav.Item>
            <OffCanvas
              name={PrivacyPolicy.name}
              text={PrivacyPolicy.text}
              title={PrivacyPolicy.title}
            />
          </Nav.Item>
          <Nav.Item>
            <OffCanvas
              name={CommunityGuidelines.name}
              text={CommunityGuidelines.text}
              title={CommunityGuidelines.title}
            />
          </Nav.Item>
          <Nav.Item>
            <OffCanvas
              name={TermsOfUse.name}
              text={TermsOfUse.text}
              title={TermsOfUse.title}
            />
          </Nav.Item>
        </Nav>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link to="#">
              <i className="fa-brands fa-square-facebook"></i>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to="#">
              <i className="fa-brands fa-square-twitter"></i>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link to="#">
              <i className="fa-brands fa-youtube"></i>
            </Nav.Link>
          </Nav.Item>
        </Nav>{" "}
      </Navbar>
      <Row>
        <Col className="text-center m-0 p-1">Copyright &copy; ProShop</Col>
      </Row>
    </Container>
  );
};
export default Footer;
