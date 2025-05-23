import jwt from "jsonwebtoken";

// generate JWT token
export function generateToken(userId){
    return jwt.sign(
        {
            userId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    )
}

