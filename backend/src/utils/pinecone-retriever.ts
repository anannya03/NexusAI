// import { OpenAI } from "langchain/llms/openai";  // Correct path for OpenAI
// import { PineconeStore } from "langchain/vectorstores/pinecone";  // Correct path for PineconeStore
// import { getPineconeIndex } from "../config/pinecone-config.js";  // Adjust based on your file structure

// const setupRetriever = async () => {
//   const indexName = "your-index-name";  // Replace with your actual index name
//   const pineconeIndex = await getPineconeIndex(indexName);

//   const openai = new OpenAI({
//     apiKey: process.env.OPEN_AI_SECRET,
//   });

//   // Initialize the Pinecone store with the Pinecone index and OpenAI embeddings
//   const retriever = new PineconeStore({
//     index: pineconeIndex,
//     embeddingModel: openai,
//   });

//   return retriever;
// };

// export default setupRetriever;
