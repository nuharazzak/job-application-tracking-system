import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {

    try {

        let token;

        // Check Authorization header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

        }

        if (!token) {

            res.status(401);

            throw new Error("Not authorized, no token provided");

        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find authenticated user
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {

            res.status(401);

            throw new Error("User not found");

        }

        next();

    } catch (error) {

        res.status(401);

        next(new Error("Not authorized, invalid or expired token"));

    }

};

export default protect;