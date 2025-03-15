import { Client, Account, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite endpoint
  .setProject("67d536c6002df1bc5fe2"); // Your project ID this is undere setting
//67d536c6002df1bc5fe2
const account = new Account(client);
const storage = new Storage(client);

export { client, account, storage };
