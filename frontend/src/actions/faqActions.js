import axios from "axios";
import {
  FAQ_LIST_REQUEST,
  FAQ_LIST_SUCCESS,
  FAQ_LIST_FAIL,
  FAQ_DETAILS_REQUEST,
  FAQ_DETAILS_SUCCESS,
  FAQ_DETAILS_FAIL,
  FAQ_DELETE_REQUEST,
  FAQ_DELETE_SUCCESS,
  FAQ_DELETE_FAIL,
  FAQ_CREATE_REQUEST,
  FAQ_CREATE_SUCCESS,
  FAQ_CREATE_FAIL,
  FAQ_UPDATE_REQUEST,
  FAQ_UPDATE_SUCCESS,
  FAQ_UPDATE_FAIL,
  FAQ_CREATE_ANSWER_SUCCESS,
  FAQ_CREATE_ANSWER_FAIL,
  FAQ_CREATE_ANSWER_REQUEST,
  FAQ_ANSWER_DELETE_REQUEST,
  FAQ_ANSWER_DELETE_SUCCESS,
  FAQ_ANSWER_DELETE_FAIL,
} from "../constants/faqConstants";

export const listFaqs =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: FAQ_LIST_REQUEST });

      // ?keyword=${keyword} for search functionality
      const { data } = await axios.get(
        `/api/faqs/?keyword=${keyword}&pageNumber=${pageNumber}`
        
      );
console.log(data)
      dispatch({
        type: FAQ_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAQ_LIST_FAIL,
        // error.response is generic
        // error.response.data.message from custom error
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listFaqDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: FAQ_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/faqs/${id}`);

    dispatch({
      type: FAQ_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteFaq = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAQ_DELETE_REQUEST,
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

    await axios.delete(`/api/faqs/${id}`, config);

    dispatch({
      type: FAQ_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FAQ_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createFaq = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAQ_CREATE_REQUEST,
    });

    // access to logged in user object

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    const { data } = await axios.post(
      `/api/faqs`,
      {}, // post request but not sending data (fix sample data)
      /*config*/
    );

    dispatch({
      type: FAQ_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateFaq = (faq) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FAQ_UPDATE_REQUEST,
    });

    // access to logged in user object
    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    const { data } = await axios.put(
      `/api/faqs/${faq._id}`,faq/*, config*/
    );

    dispatch({
      type: FAQ_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FAQ_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createFaqAnswer =
  (faqId, answer) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FAQ_CREATE_ANSWER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`/api/faqs/ans/${faqId}/answers`, answer , config);

      dispatch({
        type: FAQ_CREATE_ANSWER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: FAQ_CREATE_ANSWER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const deleteFaqAnswer = (faqId, answer) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FAQ_ANSWER_DELETE_REQUEST,
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
      await axios.delete(`/api/faqs/ans/${faqId}/answers`, config);

      dispatch({
        type: FAQ_ANSWER_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: FAQ_ANSWER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };