import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
    //I am checking token in cookies-i need cookie parser
    //install cookieparser and import in index.js

    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, " Unauthorized"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Not allowed"));
        //user is from cookie-id send it to next
        req.user = user; //send id->next function as request
        next();
    });
};