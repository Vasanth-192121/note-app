// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     fullName : { type : String },
//     email : { type : String },
//     password : { type : String },
//     createdOn: { type: Date, default: Date.now },
// });

// const User = mongoose.model("User", userSchema);

// export default User;


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     createdOn: { type: Date, default: Date.now },
//     otp: { type: String },
//     verified: { type: Boolean, default: false } // Add verified flag
// });

// const User = mongoose.model("User", userSchema);

// export default User;


// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: {
//         type: String,
//         required: function() {
//             return !this.googleId; // Only required if no Google ID
//         }
//     },
//     googleId: { type: String, required: false },
//     createdOn: { type: Date, default: Date.now },
//     otp: { type: String },
//     verified: { type: Boolean, default: false }
// });

// const User = mongoose.model("User", userSchema);

// export default User;



import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Only required if no Google ID
        }
    },
    googleId: { type: String, required: false },
    createdOn: { type: Date, default: Date.now },
    otp: { type: String },
    verified: { type: Boolean, default: false },
    // Fields for password reset remain
    passwordResetToken: String,
    passwordResetExpires: Date,
});

// Removed pre-save hook for password hashing
// Removed comparePassword method

const User = mongoose.model("User", userSchema);

export default User;
