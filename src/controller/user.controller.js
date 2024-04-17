import bycrypt from 'bcryptjs';
import User from '../models/user.model.js';
import UserData from '../models/task.model.js';
import generateTokenSetCookie from "../utils/generateToken.js";
import mongoose from "mongoose";

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


// ------------Data retriving---------- ✅
export const gettingData = async (req, res) => {
    try {
        const userID = req.user._id;

        // Find the user data by userid
        const userData = await UserData.findOne({ userid: userID });

        res.status(200).json(userData );
    } catch (error) {
        console.log("Error in Get data controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}

// ------------Task Adding---------- ✅
export const addingTask = async (req, res) => {
    try {
        let userData;
        const userID = req.user._id;
        console.log("UserID:", userID);
        const todoData = req.body;
        console.log("TodoData:", todoData);

        // Find the user data by userid
        userData = await UserData.findOne({ userid: userID });

        if (!userData) {

            // If user data does not exist, create a new UserData document
            userData = new UserData({
                userid: userID,
                data: [todoData] // Wrap todoData in an array
            });

        } else {
            // If user data exists, update the data by pushing todoData
            userData.data.push(todoData);
        }

        await userData.save();

        res.status(200).json({ message: userData });
    }
    catch (error) {
        console.log("Error in Add controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}

// ------------Update task status---------- ✅
export const updatingTask = async (req, res) => {
    try {
        let result;
        const userID = req.user._id;
        const { taskID } = req.body;

        // Find the user data by userid and update the isCompleted field in the matched task
        const updatedUserData = await UserData.findOne({ userid: userID });

        if (updatedUserData) {
            // Iterate over the data array to find the matching task
            updatedUserData.data.forEach(task => {

                if (task._id == taskID) {
                    // Update the isCompleted field 
                    task.isCompleted = task.isCompleted ? false : true;
                    result = task.isCompleted;
                }
            });

            // Save the updated user data
            await updatedUserData.save();

            res.status(200).json({ isCompleted: result });
        }
    } catch (error) {
        console.log("Error in Update controller", error.message);
        res.status(500).json({ error: "Internal Server error" })

    }
}

// ------------Delete task---------- ✅
export const deletingTask = async(req, res) => {
    try {
        const userID = req.user._id;
        const { taskID } = req.body;

        // Find the user data by userid
        const updatedUserData = await UserData.findOne({ userid: userID });

        if (updatedUserData) {
            // Filter the data array to exclude the object with the specified _id
            updatedUserData.data = updatedUserData.data.filter(task => task._id != taskID);

            // Save the updated user data
            await updatedUserData.save();

            res.status(200).json({ delete: true });
        } 
    }catch (error) {
            console.log("Error in Delete controller", error.message);
            res.status(500).json({ error: "Internal Server error" })

        }
    }

