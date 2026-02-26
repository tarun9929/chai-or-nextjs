import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string,
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyExpiryCode: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    message: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        lowercase: true,
        minLength: [4, "Username must have atleast 4 characters"],
        maxlength: [10, "Username can have only 10 characters"],
        match: [/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm, "Please Use a vaild username"],
    },
    email: {
        type: String,
        required: [true, "Eamil is required"],
        lowercase: true,
        unique: true,
        match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, "Invalid Email Address"]
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        match: [/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g, "Use A Strong Password"]
    },
    verifyCode: {
        type: String,
        required: [true, "Code is required"]
    },
    verifyExpiryCode: {
        type: Date,
        required: [true, "Code Expiry is Required"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    message: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;
