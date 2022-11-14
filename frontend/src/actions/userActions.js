import axios from 'axios';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  SIGNOUT_REQUEST,
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
  // USER_UPDATE_PROFILE_RESET,
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
  USER_DELETE_RENTED_REQUEST,
  USER_DELETE_RENTED_SUCCESS,
  USER_DELETE_RENTED_FAIL,
} from '../constants/userConstants';


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // config object - when we send data we want to sent content-type in header
    // send token for protected routes
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));

    // socket.emit('setup', data);
    // socket.on('connected', () => {
    //   console.log(`My Socket Id is: ${socket.id}`);
    // });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  storage.removeItem('persist:root');

  dispatch({ type: USER_LOGOUT });
  dispatch({ type: SIGNOUT_REQUEST });
  // when we logout state of user details is reset > so that different user who log in does not see other details
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET }); // obsolete?

  document.location.href = '/login';
};

export const register =
  (name, email, password, city, district) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password, city, district },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      // after registration login the user right away
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// we get userInfo (with token) from getState method
// in ProfileScreen in our dispatch we pass profile, not an actual id
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    // access to logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    // access to logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put('/api/users/profile', user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    // after name profile update
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    // access to logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/users', config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    // access to logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    // access to logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// we get userInfo (with token) from getState method
// in ProfileScreen in our dispatch we pass profile, not an actual id
export const getUserDetailsProductCreator =
  (userId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_PRODUCT_CREATOR_REQUEST,
      });

      // access to logged in user object
      // const {
      //   userLogin: { userInfo },
      // } = getState();

      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // };

      const { data } = await axios.get(`/api/users/product-creator/${userId}`);

      dispatch({
        type: USER_DETAILS_PRODUCT_CREATOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_PRODUCT_CREATOR_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//wishList
// USER_ADD_WISHITEM_REQUEST ,
// USER_ADD_WISHITEM_SUCCESS ,
// USER_ADD_WISHITEM_FAIL ,

export const addWishItem = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADD_WISHITEM_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/mywish/${productId}`, config);
    //console.log("wishlistData", data);

    dispatch({
      type: USER_ADD_WISHITEM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ADD_WISHITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   USER_WISHLIST_REQUEST,
//   USER_WISHLIST_SUCCESS,
//   USER_WISHLIST_FAIL,
//   USER_WISHLIST_RESET,

export const getUserWishList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_WISHLIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`api/users/all/mywish`, config);
    //console.log("data from getUserWish ", data);
    dispatch({
      type: USER_WISHLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_WISHLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//   USER_DELETE_WISHITEM_REQUEST,
//   USER_DELETE_WISHITEM_SUCCESS,
//   USER_DELETE_WISHITEM_FAIL,

export const deleteWishItem = (productId) => async (dispatch, getState) => {
  //console.log("deleteWishItem: productId", productId);
  try {
    dispatch({
      type: USER_DELETE_WISHITEM_REQUEST,
    });

    // access to logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/mywish/${productId}`, config);

    dispatch({
      USER_DELETE_WISHITEM_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_WISHITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteRentedItem = (productId) => async (dispatch, getState) => {
  //console.log("deleteWishItem: productId", productId);
  try {
    dispatch({
      type: USER_DELETE_RENTED_REQUEST,
    });

    // access to logged in user object
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/myrented/${productId}`, config);

    dispatch({
      USER_DELETE_RENTED_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_RENTED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
