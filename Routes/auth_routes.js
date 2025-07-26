import { Router } from "express";

const authRouter = Router();

authRouter.get('/sign_up', (req,res)=>{ res.send({title:"Sign up"})});
authRouter.get('/sign_in', (req,res)=>{ res.send({title:"Sign In"})});
authRouter.get('/sign_out', (req,res)=>{ res.send({title:"Sign Out"})});

export default authRouter;