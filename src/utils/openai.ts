import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

// Quick test to verify API connection
const testConnection = async () => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant."
        },
        {
          role: "user",
          content: "Test connection"
        }
      ]
    });
    console.log("OpenAI connection successful");
    return true;
  } catch (error) {
    console.error("OpenAI connection failed:", error);
    return false;
  }
};

// Test the connection immediately
testConnection();

export { openai, testConnection };