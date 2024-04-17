import mongoose from "mongoose";

// Define a schema for the todo item
const todoSchema = new mongoose.Schema({
    isCompleted: Boolean,
    // _id: String,
    task: String
});

// Define a schema for the user data
const userDataSchema = new mongoose.Schema({
    userid: String,
    data: [todoSchema] // Array of todo items
});

// Create a Mongoose model for user data
const UserData = mongoose.model("UserData", userDataSchema);

export default UserData;