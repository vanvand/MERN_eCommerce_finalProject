import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_DETAILS_PRODUCT_CREATOR_REQUEST,
  USER_DETAILS_PRODUCT_CREATOR_SUCCESS,
  USER_DETAILS_PRODUCT_CREATOR_FAIL,
  USER_DETAILS_PRODUCT_CREATOR_RESET,
  //wishList
  USER_ADD_WISHITEM_REQUEST,
  USER_ADD_WISHITEM_SUCCESS,
  USER_ADD_WISHITEM_FAIL,
  USER_WISHLIST_REQUEST,
  USER_WISHLIST_SUCCESS,
  USER_WISHLIST_FAIL,
  USER_DELETE_WISHITEM_REQUEST,
  USER_DELETE_WISHITEM_SUCCESS,
  USER_DELETE_WISHITEM_FAIL,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LIST_RESET:
      return {
        user: [],
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return state;
  }
};

export const userDetailsProductCreatorReducer = (state = { userProductCreator: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_PRODUCT_CREATOR_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_PRODUCT_CREATOR_SUCCESS:
      return { loading: false, userProductCreator: action.payload };
    case USER_DETAILS_PRODUCT_CREATOR_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_PRODUCT_CREATOR_RESET:
      return { userProductCreator: {} };
    default:
      return state;
  }
};

//wishList
// USER_ADD_WISHITEM_REQUEST ,
// USER_ADD_WISHITEM_SUCCESS ,
// USER_ADD_WISHITEM_FAIL ,

export const userAddWishItemReducer = (state = { wishItems: [] }, action) => {
  switch (action.type) {
    case USER_ADD_WISHITEM_REQUEST:
        return { ...state, loading: true };
        case USER_ADD_WISHITEM_SUCCESS:
      return { loading: false, success: true, wishItems: action.payload };
    case USER_ADD_WISHITEM_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// USER_WISHLIST_REQUEST,
// USER_WISHLIST_SUCCESS,
// USER_WISHLIST_FAIL,

export const userWishListReducer = (state = { wishItems: [] }, action) => {
  switch (action.type) {
    case USER_WISHLIST_REQUEST:
      console.log("stateWash", state);
      return { ...state, loading: true };
    case USER_WISHLIST_SUCCESS:
      return { loading: false, wishItems: action.payload };
    case USER_WISHLIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// USER_DELETE_WISHITEM_REQUEST
// USER_DELETE_WISHITEM_SUCCESS
// USER_DELETE_WISHITEM_FAIL

export const userDeleteWishItemReducer = (
  state = { wishItems: [] },
  action
) => {
  switch (action.type) {
    case USER_DELETE_WISHITEM_REQUEST:
      return { loading: true };
    case USER_DELETE_WISHITEM_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_WISHITEM_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
