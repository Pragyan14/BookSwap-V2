import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = req.cookies?.accessToken || (authHeader ? authHeader.replace("Bearer ", "") : null);      

        if (!token) {
            throw new ApiError(401, "Unauthorized Token");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) {
            throw new ApiError(401, "Invalid Access Token");
        }

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;

        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})