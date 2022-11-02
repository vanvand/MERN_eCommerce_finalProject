import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from '../components/SearchBox';
import { logout } from '../actions/userActions';

import { BiListPlus } from 'react-icons/bi';

import { GrUserSettings } from 'react-icons/gr';
import { FiLogOut } from 'react-icons/fi';
import { TbDoorEnter } from 'react-icons/tb';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import './components_css/header.css';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from './Loader';
import Message from './Message';

import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

import { listProducts, createProduct } from '../actions/productActions.js';
import { Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const pageNumber = params.pageNumber || 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  //.......... Offer Product..............

  const navigate = useNavigate();

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

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  //........................

  return (
    <header>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
        className='navbar_header'
      >
        <Container className='d-flex '>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />

            <Nav className='ml-auto navbar-Collapse'>
              {/* is user is logged in */}
              {userInfo ? (
                <>
                  <LinkContainer to='/'>
                    <Nav.Link className='icon'>
                      <i className='fa-regular fa-heart'></i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/chat'>
                    <Nav.Link className='icon'>
                      <i className='fa-regular fa-envelope'></i>
                    </Nav.Link>
                  </LinkContainer>

                  <Link>
                    <Button
                      className='offer-product'
                      variant='outline-light'
                      size='sm'
                      onClick={createProductHandler}
                    >
                      <i className='fas fa-plus'></i> Offer Product
                    </Button>
                  </Link>

                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='#'>
                      <NavDropdown.Item>
                        <HiOutlineDocumentAdd /> My Ads
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='#'>
                      <NavDropdown.Item>
                        <TbDoorEnter /> My Rents
                      </NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/wishlist'>
                      <NavDropdown.Item>
                        <BiListPlus /> Wishlist
                      </NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='#'>
                      <NavDropdown.Item>
                        <GrUserSettings /> Setting
                      </NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/login'>
                      <NavDropdown.Item onClick={logoutHandler}>
                        <FiLogOut /> Logout
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : (
                // is no user is logged in
                <>
                  <Link to='/login'>
                    <Button
                      variant='outline-light'
                      size='sm'
                      className='offer-product'
                    >
                      <i className='fas fa-plus'></i> Offer Product
                    </Button>
                  </Link>
                  <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              <LinkContainer to='/faq'>
                <Nav.Link className='icon'>
                  <i className='fa-regular fa-circle-question'></i>
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
