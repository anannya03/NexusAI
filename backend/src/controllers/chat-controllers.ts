import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { getPineconeIndex } from "../config/pinecone-config.js";
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import dotenv from 'dotenv';

dotenv.config();

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    // Grab chats of the user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Configure OpenAI and Pinecone
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    const pineconeIndex = await getPineconeIndex("chatbot-index"); // Replace with your actual index name

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPEN_AI_SECRET, // or process.env.AZURE_OPENAI_KEY if using Azure
    });

    const vector = await embeddings.embedQuery(message);

    // Correct query structure for Pinecone
    const queryResponse = await pineconeIndex.query({
      topK: 5, // Adjust as needed
      vector: vector, // The vector generated from the message
      includeValues: false, // Optional: whether to include vector values
      includeMetadata: true, // Optional: whether to include metadata
    });

    // Extract the relevant metadata and ensure it's a string
    const retrievedText = String(queryResponse.matches[0]?.metadata?.text || "No relevant info found.");

    // Incorporate the retrieved information into the chat context
    chats.push({ content: retrievedText, role: "assistant" });

    // Get the latest response from OpenAI
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-4",
      messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};



export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    
    // Clear the DocumentArray instead of assigning it to an empty array
    user.chats.splice(0, user.chats.length);
    await user.save();

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

