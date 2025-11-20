import USER from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be atleast 8 charecters" });
        }
        const existingUser = await USER.existingUsers(email);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: "User already exists with this email" })
        }
        const hashpass = await bcrypt.hash(password, 10)

        const User = await USER.signUp({ name, email, password: hashpass })
        res.status(200).json({
            message: "User registered successfully"
        })

    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

export const SignInUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }
        const user = await USER.existingUsers(email);
        if  (user.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const dbUser=user[0];
        const isPasswordValid = await bcrypt.compare(password,dbUser.password);
        if(!isPasswordValid){
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token= generateToken({id:dbUser.id,email:dbUser.email,role:dbUser.role});

        return res.json({message:"Login success",token,user:{id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email
    }
    });
    } catch (err) {
        return res.status(500).json({ error: err.message})
    }
}