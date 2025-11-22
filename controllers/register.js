import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        console.log("REQ BODY ->", req.body);

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        const isExistingUser = await User.find({ email });
        if (isExistingUser.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        
        await User.create({
            username,
            email,
            password:hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create user",
        });
    }
}
