import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/user_controller.js";
import authorize from "../models/middlewares/auth_middleware.js";

const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id',authorize, getUserById);
userRouter.post('/', (req, res)=>{ res.send({ title: "Create new user"})});
userRouter.put('/:id', (req, res)=>{ res.send({ title: "Update user"})});
userRouter.delete('/:id', (req, res)=>{ res.send({ title: "Delete user"})});

export default userRouter;