import { Pinecone } from '@pinecone-database/pinecone';
import { config } from "dotenv";

config();

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,  // Ensure your API key is securely stored in your .env file
});

export const getPineconeIndex = async (indexName: string) => {
  try {
    // List existing indexes
    const existingIndexes = await pinecone.listIndexes();

    // Check if the index exists by iterating over the index list
    const indexExists = existingIndexes.indexes.some(index => index.name === indexName);

    if (!indexExists) {
      // Create the index if it doesn't exist
      await pinecone.createIndex({
        name: indexName,
        dimension: 8,  // Replace with your model dimensions
        metric: 'euclidean',  // Replace with your model metric
        spec: { 
          serverless: { 
              cloud: 'aws',  // Replace with your cloud provider
              region: 'us-east-1'  // Replace with your region
          }
        } 
      });
      console.log(`Index ${indexName} created successfully.`);
    } else {
      console.log(`Index ${indexName} already exists.`);
    }

    // Return the index object for further operations
    return pinecone.Index(indexName);
  } catch (error) {
    console.error("Error initializing Pinecone index:", error);
    throw error;
  }
};
