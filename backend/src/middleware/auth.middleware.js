import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _ , next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            throw new ApiError(401, "Unauthorized Token");
            // return res.status(401).json(new ApiError(401,null, "Unauthorized Token"))
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.userId = decodedToken.userId;

        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})