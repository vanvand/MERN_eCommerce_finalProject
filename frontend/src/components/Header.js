import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Bootstrap
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Image from 'react-bootstrap/Image';
import SearchBox from '../components/SearchBox';
// react icons
import { BiListPlus } from 'react-icons/bi';
import { GrUserSettings } from 'react-icons/gr';
import { FiLogOut } from 'react-icons/fi';
import { TbDoorEnter } from 'react-icons/tb';
import { HiOutlineDocumentAdd } from 'react-icons/hi';

import Loader from './Loader';
import Message from './Message';

import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import { logout, getUserDetails } from '../actions/userActions';
import { listProducts, createProduct } from '../actions/productActions.js';
import { getRecentChats } from '../actions/chatActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const pageNumber = params.pageNumber || 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    error: errorUserDetails,
    user,
  } = userDetails;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (createdProduct) {
      navigate(`/products/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [userInfo, dispatch, navigate, successCreate, createdProduct, pageNumber]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails(userInfo._id));
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getRecentChats());
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <header>
      {loadingUserDetails && <Loader />}
      {errorUserDetails && (
        <Message variant='danger'>{errorUserDetails}</Message>
      )}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      <Navbar expand='lg' collapseOnSelect>
        <Container className='d-flex '>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Image src='../../../uploads/logo-asone.png' height='40' />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto navbar-Collapse align-items-center'>
              <SearchBox />

              {/* view: user logged in */}
              {userInfo ? (
                <>
                  <Nav.Item>
                    <Nav.Link href='/wishlist' className='icon'>
                      <i className='fa-regular fa-heart'></i>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link href='/chat' className='icon'>
                      <i className='fa-regular fa-envelope'></i>
                    </Nav.Link>
                  </Nav.Item>

                  <NavDropdown className="user-dropdown"
                    title={
                      user.image ? (
                        <Image
                          className='userThumbnail'
                          src={user.image}
                          fluid
                        />
                      ) : (
                        <span className="icon">
                        <i className='far fa-user'></i>
                        </span>
                      )
                    }
                  >
                    <NavDropdown.Item href='/useradd'>
                      <HiOutlineDocumentAdd /> My Ads
                    </NavDropdown.Item>

                    <NavDropdown.Item href='#'>
                      <TbDoorEnter /> My Rents
                    </NavDropdown.Item>

                    <NavDropdown.Item href='/wishlist'>
                      <BiListPlus /> Wishlist
                    </NavDropdown.Item>

                    <NavDropdown.Item href='/profile'>
                      <GrUserSettings /> Setting
                    </NavDropdown.Item>

                    <NavDropdown.Item href='/login' onClick={logoutHandler}>
                      <FiLogOut /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Item>
                    <Button
                      className='btn-custom-cta'
                      size='sm'
                      onClick={createProductHandler}
                    >
                      Offer Product
                    </Button>
                  </Nav.Item>
                </>
              ) : (
                // view: user NOT logged in
                <>
                  <Nav.Item>
                    <Nav.Link href='/login'>
                      <Button className='btn-custom-cta-light' size='sm'>
                        Register | Login
                      </Button>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link href='/login'>
                      <Button className='btn-custom-cta' size='sm'>
                        Offer Product
                      </Button>
                    </Nav.Link>
                  </Nav.Item>
                </>
              )}

              {/* Admin Dashboard */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' className="btn-admin" >
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              <Nav.Item>
                <Nav.Link href='/faq' className='icon'>
                  <i className='fa-regular fa-circle-question'></i>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
