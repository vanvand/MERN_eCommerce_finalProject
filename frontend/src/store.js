import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
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
  userDetailsProductCreatorReducer,
  userAddWishItemReducer,
  userWishListReducer,
  userDeleteWishItemReducer,
  userDeleteRentedItemReducer,
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
import {
  chatReducer,
  recentChatReducer,
  selectedChatReducer,
} from './reducers/chatReducers';
// import { notificationReducer } from './reducers/notificationReducers';

import {
  searchCreateReducer,
  searchListReducer,
} from './reducers/MostSearchReducers';

// create constants and reducer > as soon as added here state is visible in browser inspect tool/redux
const appReducer = combineReducers({
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
  userDetailsProductCreator: userDetailsProductCreatorReducer,
  userAddWishItem: userAddWishItemReducer,
  userWishList: userWishListReducer,
  userDeleteWishItem: userDeleteWishItemReducer,
  userDeleteRentedItem: userDeleteRentedItemReducer,
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
  selectedChat: selectedChatReducer,
  searchCreate: searchCreateReducer,
  searchList: searchListReducer,
});

// const rootReducer = (state, action) => {
//   if (action.type === 'USER_LOGOUT') {
//     return appReducer(undefined, action);
//   }
//   if (action.type === 'SIGNOUT_REQUEST') {
//     // for all keys defined in your persistConfig(s)
//     storage.removeItem('persist:root');
//     // storage.removeItem('persist:otherKey')

//     return appReducer(undefined, action);
//   }
//   return appReducer(state, action);
// };

// from userActions
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const preloadedState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['productTopCategoryName', 'productList'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
