import express from "express";

import { PORT } from "./config/env.js"

import userRouter from "./Routes/user_routes.js";
import authRouter from "./Routes/auth_routes.js";
import subscriptionRouter from "./Routes/subscription_routes.js";


const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

console.log(PORT);
app.listen(PORT, ()=>{
    console.log(`server is listening on port http://localhost:${PORT}`);
})

export default app;