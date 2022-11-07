import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {
  productListReducer,
  productDetailReducer,
  productDetailByUserIdReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productTopCategoryNameReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userAddWishItemReducer,
  userWishListReducer,
  userDeleteWishItemReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducer';
import {
  faqListReducer,
  faqDetailsReducer,
  faqDeleteReducer,
  faqCreateReducer,
  faqUpdateReducer,
  faqAnswersCreateReducer,
  faqAnswerDeleteReducer,
} from './reducers/faqReducers';
import { chatReducer, recentChatReducer } from './reducers/chatReducers';
// import { notificationReducer } from './reducers/notificationReducers';

import {
  searchCreateReducer,
  searchListReducer,
} from "./reducers/MostSearchReducers";

// create constants and reducer > as soon as added here state is visible in browser inspect tool/redux
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  productDetailsByUserId: productDetailByUserIdReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productTopCategoryName: productTopCategoryNameReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userAddWishItem: userAddWishItemReducer,
  userWishList: userWishListReducer,
  userDeleteWishItem: userDeleteWishItemReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  faqList: faqListReducer,
  faqDetails: faqDetailsReducer,
  faqDelete: faqDeleteReducer,
  faqCreate: faqCreateReducer,
  faqUpdate: faqUpdateReducer,
  faqAnswersCreate: faqAnswersCreateReducer,
  faqAnswerDelete: faqAnswerDeleteReducer,
  chat: chatReducer,
  recentChat: recentChatReducer,
  searchCreate: searchCreateReducer,
  searchList: searchListReducer,
});


// from userActions
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;


const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer,
  preloadedState,
  middleware: [thunk],
});
export default store;
