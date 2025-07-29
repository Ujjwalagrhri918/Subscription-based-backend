import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../config/env.js";
import User from "../usermodel.js";


const authorize = async (req, res, next) => {
    try {
        let token;

        // Check if Authorization header exists and starts with 'Bearer'
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // Extract token
        }

        // If token is missing, return unauthorized
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        // Verify token and decode user ID
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fetch user from DB using decoded ID
        const user = await User.findById(decoded.userId);

        // If user doesn't exist, return unauthorized
        if (!user) return res.status(401).json({ message: "Unauthorized" });

        req.user = user; // Attach user to request
        next(); // Proceed to next middleware/route
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};


export default authorize;