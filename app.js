import express from "express";
import cookieParser from 'cookie-parser';

import { PORT } from "./config/env.js"

import userRouter from "./Routes/user_routes.js";
import authRouter from "./Routes/auth_routes.js";
import subscriptionRouter from "./Routes/subscription_routes.js";
import connectToDB from "./database/mongodb.js";
import errorMiddleware from "./models/middlewares/error_middleware.js";


const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);
app.use(express.json()); // Parses incoming requests with JSON payloads (used for API requests)
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies (e.g., form submissions)
app.use(cookieParser()); // Parses cookies from the HTTP request header (useful for auth/session)



console.log(PORT);
app.listen(PORT, async ()=>{
    console.log(`server is listening on port http://localhost:${PORT}`);
    await connectToDB();
})

export default app;