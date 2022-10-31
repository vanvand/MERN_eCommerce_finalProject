import {
  SELECT_CHAT,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  NEW_CREATED_CHAT,
  RECENT_CHAT_REQUEST,
  RECENT_CHAT_SUCCESS,
  RECENT_CHAT_FAIL,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
} from '../constants/chatConstants';

const initialState = {
  chat: {},
  messages: [],
  loading: false,
  error: false,
};

export const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SELECT_CHAT:
      return {
        ...state,
        chat: payload,
        loading: false,
        error: false,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, payload],
        loading: false,
        error: false,
      };
    case SEND_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case SEND_MESSAGE_FAIL:
      return { ...state, error: payload };
    case FETCH_MESSAGES_REQUEST:
      return { ...state, loading: true };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: payload,
        loading: false,
        error: false,
      };
    case FETCH_MESSAGES_FAIL:
      return { ...state, error: payload };
    default:
      return state;
  }
};

const initState = {
  recent_chat: [],
  loading: false,
  error: false,
};

export const recentChatReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case RECENT_CHAT_REQUEST:
      return { ...state, loading: true };

    case RECENT_CHAT_SUCCESS:
      return {
        ...state,
        recent_chat: payload,
        loading: false,
        error: false,
      };
    case NEW_CREATED_CHAT:
      return {
        ...state,
        recent_chat: [payload, ...state.recent_chat],
        loading: false,
        error: false,
      };
    case RECENT_CHAT_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
