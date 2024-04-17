import bycrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateTokenSetCookie from "../utils/generateToken.js";

// ------------User sign up---------- ✅
export const signUpUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({ error: "User Already Exists" });
        }

        //Hashing the password
        const salt = await bycrypt.genSalt(10);
        const hashPassword = await bycrypt.hash(password, salt);

        const newUser = new User({
            userName,
            password: hashPassword,
        })

        if (newUser) {
            //Generate JWT tokens
            generateTokenSetCookie(newUser._id, res);
            await newUser.save();
            console.log("New User Created")
            res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
            })
        }
        else {
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in SignUp controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}

// ------------User Login---------- ✅
export const logInUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        const isPasswordCorrect = await bycrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ success: false, error: "Invalid Username or Password" });
        }

        generateTokenSetCookie(user._id, res);

        console.log("User Logged In");
        res.status(200).json({ success: true });

    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });

    }
}

// ------------User Logout---------- ✅
export const logOutUser = (req, res) => {
    try {
        console.log("User Log Out");
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}


// ------------Data retriving---------- 
export const gettingData = (req, res) => {
    try {
        
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Get data controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}

// ------------Task Adding---------- 
export const addingTask = (req, res) => {
    try {
        
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Add controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}

// ------------Update task status---------- 
export const updatingTask = (req, res) => {
    try {
        
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Update controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}

// ------------Delete task---------- 
export const deletingTask = (req, res) => {
    try {
        
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Delete controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}

