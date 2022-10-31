import axios from 'axios';
import {
  SELECT_CHAT,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_SUCCESS,
  RECENT_CHAT_REQUEST,
  RECENT_CHAT_FAIL,
  RECENT_CHAT_SUCCESS,
  NEW_CREATED_CHAT,
} from '../constants/chatConstants.js';

//fetches selected messages and joins chat on socket.io
export const fetchCurrentMessages =
  (chatId, socket) => async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_MESSAGES_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/message/${chatId}`, config);

      socket.emit('join chat', chatId);

      dispatch({ type: FETCH_MESSAGES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_MESSAGES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const sendMessageApi =
  (msg, token, socket, currentChat) => async (dispatch) => {
    try {
      dispatch({ type: SEND_MESSAGE_REQUEST });

      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `/api/message/${currentChat}`,
        { msg: msg },
        config
      );

      socket.emit('new message', data);

      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const makeRecentChatApi = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RECENT_CHAT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/chat`, config);

    dispatch({
      type: RECENT_CHAT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECENT_CHAT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Access to chat if possible, if not, creates new chat
export const accessChat =
  (selectedUserId, token, recentChat, currentUser) => async (dispatch) => {
    try {
      dispatch({ type: RECENT_CHAT_REQUEST });

      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `/api/chat`,
        { selectedUserId, currentUser },
        config
      );

      if (!recentChat.find((el) => el._id === data._id)) {
        dispatch({
          type: NEW_CREATED_CHAT,
          payload: data,
        });
        return;
      }

      dispatch({
        type: SELECT_CHAT,
        payload: {
          index: 0,
          user: data.users.find((el) => el._id === selectedUserId),
          _id: data._id,
        },
      });
    } catch (error) {
      dispatch({
        type: RECENT_CHAT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
