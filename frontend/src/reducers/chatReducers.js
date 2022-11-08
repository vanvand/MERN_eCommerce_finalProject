import {
  SELECT_CHAT,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  NEW_CREATED_CHAT,
  RECENT_CHAT_REQUEST,
  RECENT_CHAT_SUCCESS,
  RECENT_CHAT_FAIL,
  UPDATE_RECENT_CHAT_REQUEST,
  UPDATE_RECENT_CHAT_SUCCESS,
  UPDATE_RECENT_CHAT_FAIL,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  UPDATE_MESSAGES_REQUEST,
  UPDATE_MESSAGES_SUCCESS,
  UPDATE_MESSAGES_FAIL,
  SET_CURRENT_SUCCESS,
  SET_CURRENT_FAIL,
  UPDATE_CHAT_SUCCESS,
  UPDATE_CHAT_REQUEST,
  UPDATE_CHAT_FAIL,
} from '../constants/chatConstants';

//CHAT
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
    case UPDATE_MESSAGES_REQUEST:
      return { ...state, loading: true };
    case UPDATE_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: payload,
        loading: false,
        error: false,
      };
    case UPDATE_MESSAGES_FAIL:
      return { ...state, error: payload };
    default:
      return state;
  }
};

//RECENT CHATS
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
        recent_chat: [...state.recent_chat, payload],
        loading: false,
        error: false,
      };
    case RECENT_CHAT_FAIL:
      return { loading: false, error: payload };
    case UPDATE_RECENT_CHAT_REQUEST:
      return { ...state, loading: true };

    case UPDATE_RECENT_CHAT_SUCCESS:
      return {
        ...state,
        recent_chat: payload,
        loading: false,
        error: false,
      };
    case UPDATE_RECENT_CHAT_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

//CURRENT CHAT
const initSelectedState = {
  currentUser: {},
  currentProduct: {},
  currentChat: '',
};

export const selectedChatReducer = (
  state = initSelectedState,
  { type, payload }
) => {
  switch (type) {
    case SET_CURRENT_SUCCESS:
      return {
        ...state,
        currentUser: payload.currentUser,
        currentProduct: payload.currentProduct,
        currentChat: payload.currentChat,
      };
    case SET_CURRENT_FAIL:
      return { ...state, error: payload };
    default:
      return state;
  }
};

//CONFIRMATION REQUIRED
const initRentedState = {
  isRequired: false,
  chatId: '',
  isRented: false,
};

export const rentReducer = (state = initRentedState, { type, payload }) => {
  switch (type) {
    case UPDATE_CHAT_REQUEST:
      return { ...state };
    case UPDATE_CHAT_SUCCESS:
      return {
        ...state,
        isRequired: payload.isRequired,
        // chatId: payload.chatId,
      };
    case UPDATE_CHAT_FAIL:
      return { ...state, error: payload };
    default:
      return state;
  }
};
