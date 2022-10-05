import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from "./reducers/userReducers"

// create constants and reducer > as soon as added here state is visible in browser inspect tool/redux
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer
})

// from cartActions
const cartItemsFromStorage = localStorage.getItem("cartItems") 
  ? JSON.parse(localStorage.getItem("cartItems")) 
  : []


// from userActions
const userInfoFromStorage = localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem("userInfo")) 
  : null

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
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