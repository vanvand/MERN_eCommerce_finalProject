import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./components_css/product.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../actions/userActions";

const Product = ({ product }) => {
  // destructure products passed as prop to use directly (alternative pass in (props) > props.product.id)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo} = userLogin;

 useEffect(() => {
   if (product.user && userInfo) {
     dispatch(getUserDetails(product.user));
   }else{navigate('/')}
 }, [dispatch, navigate, product, product.user, userInfo]);

  return (
    <Card className="my-2 p-3 rounded" key={product._id}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="productImage" />
      </Link>

      <Card.Body>
        {/* it was h3 change it to h6 */}
        {product?.user === user?._id && (
          <Card.Text as="h6">
            <i className="fas fa-location-dot"></i> {user.city}, {user.district}
          </Card.Text>
        )} 

        <Link to={`/product/${product._id}`}>
          <Card.Title as="h6" className="productText">
            {product.name}
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
