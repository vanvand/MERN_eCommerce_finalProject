import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import SearchBox from "../components/SearchBox"
import { logout } from "../actions/userActions"

import { BiListPlus } from "react-icons/bi";

import { GrUserSettings } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";
import { TbDoorEnter } from "react-icons/tb";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { GrCircleQuestion } from "react-icons/gr";
import "./components_css/header.css";


const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="navbar_header"
      >
        <Container className="d-flex ">
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />

            <Nav className="ml-auto navbar-Collapse">
              {/* is user is logged in */}
              {userInfo ? (
                <>
                  <LinkContainer to="/">
                    <Nav.Link className="icon">
                      <i className="fa-regular fa-heart"></i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <Nav.Link className="icon">
                      <i className="fa-regular fa-envelope"></i>
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/">
                    <Nav.Link> Offer Product</Nav.Link>
                  </LinkContainer>

                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="#">
                      <NavDropdown.Item>
                        <HiOutlineDocumentAdd /> My Ads
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="#">
                      <NavDropdown.Item>
                        <TbDoorEnter /> My Rents
                      </NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/cart">
                      <NavDropdown.Item>
                        <BiListPlus /> Wishlist
                      </NavDropdown.Item>
                    </LinkContainer>

                    {/* <LinkContainer to="#">
                      <NavDropdown.Item>
                        <MdOutlineSavedSearch /> Saved Search
                      </NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <CgProfile /> My Profile
                      </NavDropdown.Item>
                    </LinkContainer> */}

                    <LinkContainer to="#">
                      <NavDropdown.Item>
                        <GrUserSettings /> Setting
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : (
                // is no user is logged in
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>Offer Product</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo && (
                <LinkContainer to="/login">
                  <Nav.Link className="icon" onClick={logoutHandler}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/help">
                <Nav.Link className="icon">
                  <i className="fa-regular fa-circle-question"></i>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
