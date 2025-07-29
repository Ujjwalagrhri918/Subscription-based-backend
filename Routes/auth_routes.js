import { Router } from "express";
import { signUp, signIn, signOut } from "../controllers/auth_controllers.js";

const authRouter = Router();

authRouter.post('/sign_up', signUp);
authRouter.post('/sign_in', signIn);
authRouter.post('/sign_out', signOut);

export default authRouter;