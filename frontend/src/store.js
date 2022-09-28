import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailReducer } from "./reducers/productReducers"

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
})

const initialState = {}

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
// import { combineReducers } from "redux"
// import thunk from 'redux-thunk'
// import { productListReducer, productDetailReducer } from "./reducers/productReducers"

// const reducer = combineReducers({
//     productList: productListReducer,
//     productDetails: productDetailReducer,
// })

// const store = configureStore({
//   reducer,
//   preloadedState: {},
//   middleware: [thunk],
// })

// console.log(store.getState())

// export default store