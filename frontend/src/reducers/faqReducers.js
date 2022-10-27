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
  FAQ_CREATE_RESET,
  FAQ_UPDATE_REQUEST,
  FAQ_UPDATE_SUCCESS,
  FAQ_UPDATE_FAIL,
  FAQ_UPDATE_RESET,
  FAQ_CREATE_ANSWER_SUCCESS,
  FAQ_CREATE_ANSWER_FAIL,
  FAQ_CREATE_ANSWER_REQUEST,
  FAQ_CREATE_ANSWER_RESET,
  FAQ_ANSWER_DELETE_REQUEST,
  FAQ_ANSWER_DELETE_SUCCESS,
  FAQ_ANSWER_DELETE_FAIL,
} from "../constants/faqConstants";

// takes in initial state of empty object and empty array of faqs
// and action > dispatch action to reducer
export const faqListReducer = (state = { faqs: [] }, action) => {
  switch (action.type) {
    // check to see if the reducer cares about this action
    case FAQ_LIST_REQUEST:
      // if so set loading to true and faqs to an empty array
      return { loading: true, faqs: [] };
    case FAQ_LIST_SUCCESS:
      // fill faqs with payload dispatched by action
      return {
        loading: false,
        faqs: action.payload.faqs,
        // pagination functionality >> extended res.json in faqController
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case FAQ_LIST_FAIL:
      return { loading: false, error: action.payload };
    // otherwise return existing state unchanged
    default:
      return state;
  }
};

export const faqDetailsReducer = (state = { faq: { answers: [] } }, action) => {
  // single faq
  switch (action.type) {
    case FAQ_DETAILS_REQUEST:
      return { loading: true, ...state }; // ...state equal to copy of state
    case FAQ_DETAILS_SUCCESS:
      return { loading: false, faq: action.payload };
    case FAQ_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    // otherwise return existing state unchanged
    default:
      return state;
  }
};

export const faqDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FAQ_DELETE_REQUEST:
      return { loading: true };
    case FAQ_DELETE_SUCCESS:
      return { loading: false, success: true };
    case FAQ_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const faqCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FAQ_CREATE_REQUEST:
      return { loading: true };
    case FAQ_CREATE_SUCCESS:
      return { loading: false, success: true, faq: action.payload };
    case FAQ_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case FAQ_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const faqUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case FAQ_UPDATE_REQUEST:
      return { loading: true };
    case FAQ_UPDATE_SUCCESS:
      return { loading: false, success: true, faq: action.payload };
    case FAQ_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case FAQ_UPDATE_RESET:
      return { faq: {} };
    default:
      return state;
  }
};

export const faqAnswersCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FAQ_CREATE_ANSWER_REQUEST:
      return { loading: true };
    case FAQ_CREATE_ANSWER_SUCCESS:
      return { loading: false, success: true };
    case FAQ_CREATE_ANSWER_FAIL:
      return { loading: false, error: action.payload };
    case FAQ_CREATE_ANSWER_RESET:
      return {};
    default:
      return state;
  }
};




export const faqAnswerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FAQ_ANSWER_DELETE_REQUEST:
      return { loading: true };
    case FAQ_ANSWER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case FAQ_ANSWER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};