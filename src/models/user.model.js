import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    //createdAt, updatedAt
},{timestamps:true})

const User = mongoose.model("user",userSchema);

export default User;