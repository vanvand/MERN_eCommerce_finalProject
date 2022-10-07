import { Routes, Route} from "react-router-dom"
import { Container } from "react-bootstrap"
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

const App = () => {
  return (
    <>
    <Header/>
    <main className="py-3">
      <Container>
        <Routes>
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/register" element={<RegisterScreen/>} />
          <Route path="/profile" element={<ProfileScreen/>} />
          
          <Route path="/product/:id" element={<ProductScreen/>} />
          
          <Route path="/cart/" element={<CartScreen/>} /> 
          <Route path="/cart/:id" element={<CartScreen/>} /> 

          <Route path="/shipping" element={<ShippingScreen/>} /> 
          <Route path="/payment" element={<PaymentScreen/>} /> 
          <Route path="/placeorder" element={<PlaceOrderScreen/>} /> 
          <Route path="/orders/:id" element={<OrderScreen/>} /> 

          <Route path="/admin/userlist" element={<UserListScreen/>} />
          <Route path="/admin/users/:id/edit" element={<UserEditScreen/>} />

          <Route path="/" element={<HomeScreen/>} />

        </Routes>
      </Container>
    </main>
    <Footer/>
    </>
  )
}

export default App;
