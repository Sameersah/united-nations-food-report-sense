import ChatActionTypes from '../constants/chatActionTypes';
import { sendPrompt, getResponse } from '../api/chatApi';

const POLLING_INTERVAL = parseInt(process.env.CHAT_BACKEND_POLLING_INTERVAL) || 1000;
const POLLING_LIMIT = parseInt(process.env.CHAT_BACKEND_POLLING_LIMIT) || 10;

export const sendMessage = (prompt) => async (dispatch) => {
  dispatch({ type: ChatActionTypes.SET_CHAT_BLOCKED });
  dispatch({ type: ChatActionTypes.SEND_MESSAGE_REQUEST });

  try {
    const id = await sendPrompt(prompt);
    if (!id) {
      throw new Error('Error while sending the prompt. Please try again.');
    }

    let attempts = 0;

    dispatch({
      type: ChatActionTypes.SEND_MESSAGE_SUCCESS,
      payload: { text: prompt, isUser: true },
    });

    while (attempts < POLLING_LIMIT) {
      try {
        const response = await getResponse(id);

        if (response.status === 200) {
          dispatch({
            type: ChatActionTypes.SEND_MESSAGE_SUCCESS,
            payload: { text: response.data.response, isUser: false },
          });
          dispatch({ type: ChatActionTypes.SET_CHAT_AVAILABLE });
          return;
        }

        if (response.status === 404) {
          attempts += 1;
          await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
          continue;
        }

        throw new Error(`Unexpected error while returning the response. Please try again.`);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          attempts += 1;
          await new Promise((resolve) => setTimeout(resolve, POLLING_INTERVAL));
        } else {
          dispatch({
            type: ChatActionTypes.SEND_MESSAGE_FAILURE,
            payload: { text: error.message, isUser: false },
          });
          dispatch({ type: ChatActionTypes.SET_CHAT_AVAILABLE });
          return;
        }
      }
    }
    dispatch({
      type: ChatActionTypes.SEND_MESSAGE_FAILURE,
      payload: { text: 'Polling limit reached. Please try again.', isUser: false },
    });
    dispatch({ type: ChatActionTypes.SET_CHAT_AVAILABLE });
  } catch (error) {
    dispatch({
      type: ChatActionTypes.SEND_MESSAGE_FAILURE,
      payload: { text: error.message, isUser: false },
    });
    dispatch({ type: ChatActionTypes.SET_CHAT_AVAILABLE });
  }
}

export const clearHistory = () => ({
  type: ChatActionTypes.CLEAR_HISTORY,
});