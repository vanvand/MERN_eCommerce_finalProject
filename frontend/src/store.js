import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer
})

// from cartActions
const cartItemsFromStorage = localStorage.getItem("cartItems") 
  ? JSON.parse(localStorage.getItem("cartItems")) 
  : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage }
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