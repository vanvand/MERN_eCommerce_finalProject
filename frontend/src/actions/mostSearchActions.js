import axios from "axios";
import {
  MOSTSEARCH_CREATE_REQUEST,
  MOSTSEARCH_CREATE_SUCCESS,
  MOSTSEARCH_CREATE_FAIL,
  MOSTSEARCH_LIST_REQUEST,
  MOSTSEARCH_LIST_SUCCESS,
  MOSTSEARCH_LIST_FAIL,
  MOSTSEARCH_CREATE_SAVE,
} from "../constants/mostSearchConstants.js";

export const createSearch =
  (search = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: MOSTSEARCH_CREATE_REQUEST,
      });

      const { data } = await axios.get(`/api/search/?search=${search}`);
      dispatch({
        type: MOSTSEARCH_CREATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: MOSTSEARCH_CREATE_SAVE,
        payload: { ...data },
      });
      //console.log("createSearch", data);
    } catch (error) {
      dispatch({
        type: MOSTSEARCH_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listSearch = () => async (dispatch) => {
  try {
    dispatch({ type: MOSTSEARCH_LIST_REQUEST });

    const { data } = await axios.get(`/api/search/mostsearch`);

    console.log("listSearch data", data);

    dispatch({
      type: MOSTSEARCH_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOSTSEARCH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
