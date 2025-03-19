import { Client, Account, Storage } from "appwrite";

const client = new Client();
const projectId = import.meta.env.VITE_APP_PROJECT_ID;

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject(projectId);
  // .setProject(import.meta.env.REACT_APP_BUCKET_ID); // Your project ID this is undere setting
const account = new Account(client);
const storage = new Storage(client);

export { client, account, storage };
