import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen.js";
import OrderListScreen from "./screens/OrderListScreen";

import ProductsByCategoryScreen from "./screens/ProductsByCategoryScreen";

import CategoryHeader from "./components/CategoryHeader";
import FaqList from "../src/components/FaqList";
import FaqCreate from "./components/FaqCreate";
import FaqScreen from "./screens/FaqScreen";
import FaqDetails from "./components/FaqDetails";
import UserWishlistScreen from "./screens/UserWishlistScreen";
import UserAdsScreen from "./screens/UserAdsScreen";


const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <CategoryHeader />
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/orders/:id" element={<OrderScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/users/:id/edit" element={<UserEditScreen />} />
            <Route
              path="/admin/productlist"
              element={<ProductListScreen />}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              element={<ProductListScreen />}
              exact
            />

            <Route path="/products/:id/edit" element={<ProductEditScreen />} />
            <Route path="/admin/orderlist" element={<OrderListScreen />} />

            {/* ...........ProductsByCategoryScreen................. */}
            <Route
              path="/productssearch/:keyword"
              element={<ProductsByCategoryScreen />}
            />
            <Route
              path="/productssearch/:keyword/:pageNumber"
              element={<ProductsByCategoryScreen />}
            />
            <Route
              path="/products/category/:keyword/page/:pageNumber"
              element={<ProductsByCategoryScreen />}
            />
            <Route
              path="/products/category/:keyword"
              element={<ProductsByCategoryScreen />}
              exact
            />

            <Route path="/search/:keyword" element={<HomeScreen />} exact />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomeScreen />}
            />

            {/* pagination for search results */}
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/" element={<HomeScreen />} exact />

            {/* Route for help button (faq) */}
            <Route path="/faq" element={<FaqScreen />} />
            <Route path="faq/page/:pageNumber" element={<FaqScreen />} />
            <Route path="/faqList" element={<FaqList />} exact />
            <Route path="/faqList/:pageNumber" element={<FaqList />} exact />
            <Route path="/faq/:id/edit" element={<FaqCreate />} />
            <Route path="/faq/:id" element={<FaqDetails />} />

            {/* faq search */}
            <Route path="/faq/search/:keyword" element={<FaqScreen />} exact />
            <Route
              path="/faq/search/:keyword/page/:pageNumber"
              element={<FaqScreen />}
            />
            {/* user Wishlist Screen */}
            <Route path="/wishlist" element={<UserWishlistScreen />} />
            {/* user Add Screen */}
            <Route path="/useradd" element={<UserAdsScreen />} exact />
            <Route path="/useradd/:userId" element={<UserAdsScreen />} exact />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;

