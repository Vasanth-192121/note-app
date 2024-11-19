// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     fullName : { type : String },
//     email : { type : String },
//     password : { type : String },
//     createdOn: { type: Date, default: Date.now },
// });

// const User = mongoose.model("User", userSchema);

// export default User;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    otp: { type: String },
    verified: { type: Boolean, default: false } // Add verified flag
});

const User = mongoose.model("User", userSchema);

export default User;
