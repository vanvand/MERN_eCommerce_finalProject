import {
  MOSTSEARCH_CREATE_REQUEST,
  MOSTSEARCH_CREATE_SUCCESS,
  MOSTSEARCH_CREATE_FAIL,
  MOSTSEARCH_LIST_REQUEST,
  MOSTSEARCH_LIST_SUCCESS,
  MOSTSEARCH_CREATE_SAVE,
  MOSTSEARCH_LIST_FAIL,
} from "../constants/mostSearchConstants.js";

export const searchCreateReducer = (state = { searchItems: [] }, action) => {
  switch (action.type) {
    case MOSTSEARCH_CREATE_REQUEST:
      return { loading: true };
    case MOSTSEARCH_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        searchItems: action.payload,
      };
    case MOSTSEARCH_CREATE_SAVE:
      return {
        ...state,
        searchItems: action.payload,
      };
    case MOSTSEARCH_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchListReducer = (state = { searchItems: [] }, action) => {
  switch (action.type) {
    case MOSTSEARCH_LIST_REQUEST:
      return {
        loading: true,
      };
    case MOSTSEARCH_LIST_SUCCESS:
      return {
        loading: false,
        mostSearch: action.payload,
      };
    case MOSTSEARCH_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
