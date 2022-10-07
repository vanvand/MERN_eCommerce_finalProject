import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from "./reducers/userReducers"
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer } from "./reducers/orderReducer"

// create constants and reducer > as soon as added here state is visible in browser inspect tool/redux
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer
})

// when store is initialized we check here if sth. is in localStorage already > if yes add that to the state
// from cartActions
const cartItemsFromStorage = localStorage.getItem("cartItems") 
  ? JSON.parse(localStorage.getItem("cartItems")) 
  : []

const shippingAddressFromStorage = localStorage.getItem("shippingAddress") 
  ? JSON.parse(localStorage.getItem("shippingAddress")) 
  : {}

// const paymentMethodFromStorage = localStorage.getItem("paymentMethod") 
//   ? JSON.parse(localStorage.getItem("paymentMethod")) 
//   : {}

// from userActions
const userInfoFromStorage = localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem("userInfo")) 
  : null

  
const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    // paymentMethod: paymentMethodFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store

// try to implement configureStore
// BUG: productDetails reducer is not called 

// import { configureStore } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk'
// import { productListReducer, productDetailReducer } from "./reducers/productReducers"

// const store = configureStore({
//   reducer: {
//     productList: productListReducer,
//     productDetails: productDetailReducer
//   }
//   preloadedState: {},
//   middleware: [thunk],
// })

// console.log(store.getState())

// export default store