import ChatActionTypes from '../constants/chatActionTypes';

const initialState = {
  messages: [],
  loading: false,
  error: null,
  chatAvailable: true,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ChatActionTypes.SEND_MESSAGE_REQUEST:
      return { ...state, loading: true, error: null };
    case ChatActionTypes.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload],
      };
    case ChatActionTypes.SEND_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload],
      };
    case ChatActionTypes.CLEAR_HISTORY:
      return { ...state, messages: [] };
    case ChatActionTypes.SET_CHAT_AVAILABLE:
      return { ...state, chatAvailable: true };
    case ChatActionTypes.SET_CHAT_BLOCKED:
      return { ...state, chatAvailable: false };
    default:
      return state;
  }
};

export default chatReducer;