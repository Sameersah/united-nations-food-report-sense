const API_URL = process.env.CHAT_BACKEND_API_URL;

export const sendPrompt = async (prompt) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('mock-id');
    }, 100); // Simulate a short delay for sending the prompt
  });
};

let ct = 0;

export const getResponse = async (id) => {
  return new Promise((resolve) => {
    let response = `This is mock response from LLM!`;
    let result = {}
    let data = {response}
    result = {data, status: ct == 3? 200: 404}
    ct = ct == 3 ? 0: ct+1;
    resolve(result);
  });
}