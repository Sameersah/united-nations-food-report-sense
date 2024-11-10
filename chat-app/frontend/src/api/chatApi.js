import axios from 'axios';

const API_URL = process.env.CHAT_BACKEND_API_URL || "http://localhost:8000/chat-app"

export const sendPrompt = async (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Please provide a valid prompt.');
  }
  try {
    const response = await axios.post(`${API_URL}/prompt`, { "message": prompt });
    if (response.status !== 200 || !response.data.id) {
      throw new Error('Failed to send the prompt. Please try again.');
    }
    return response.data.id;
  } catch (error) {
    throw new Error('An error occurred while sending the prompt. Please try again later.');
  }
};

export const getResponse = async (id) => {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid request. Please try again.');
  }
  try {
    const response = await axios.get(`${API_URL}/response?id=${id}`);
    if (response.status !== 200) {
      throw new Error('Failed to retrieve the response. Please try again.');
    }
    if (!response.data || typeof response.data.response !== 'string') {
      throw new Error('Invalid response format. Please try again.');
    }
    return response.data.response;
  } catch (error) {
    throw new Error('An error occurred while retrieving the response. Please try again later.');
  }
};