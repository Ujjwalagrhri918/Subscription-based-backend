// config/env.js
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname (since it's not available in ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct path to the correct .env file inside config/
const envFile = path.resolve(
  __dirname,
  `.env.${process.env.NODE_ENV || "development"}.local`
);

// Load the .env file
config({ path: envFile });

// Export environment variables
export const {PORT, NODE_ENV, DB_URI} = process.env;
