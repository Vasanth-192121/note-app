// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { createRequire } from "module";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import { authenticateToken } from "./utilites.js";
// import User from "./models/user.model.js";
// import Note from "./models/note.model.js"

// dotenv.config();

// async function connectDB() {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('MongoDB connected...');
// }

// connectDB();

// const app = express();
// const port = 3000;

// dotenv.config();

// app.use(express.json());
// app.use(
//     cors({
//         origin : "*",
//     })
// );

// app.get("/", (req, res) => {
//     res.json({ data : "Hello" })
// });

// // Create Account

// app.post("/create-account", async (req, res) => {
//     const { fullName, email, password } = req.body;

//     if (!fullName) {
//         return res.status(400).json({
//             error: true,
//             message: "Fullname is required"
//         });
//     }

//     if (!email) {
//         return res.status(400).json({
//             error: true,
//             message: "Email is required"
//         });
//     }

//     if (!password) {
//         return res.status(400).json({
//             error: true,
//             message: "Password is required"
//         });
//     }

//     const isUser = await User.findOne({ email : email });

//     if (isUser) {
//         return res.json({
//             error: true,
//             message: "User already exists",
//         });
//     }

//     const user = new User({
//         fullName,
//         email,
//         password,
//     });

//     await user.save();
//     console.log('User saved:', user);

//     const accessToken = jwt.sign(
//         { user },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn : "36000m" }
//     );

//     return res.json({
//         error: false,
//         user,
//         accessToken,
//         message: "Registration Successful",
//     });
// });

// // Login Account

// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     if (!email) {
//         return res
//             .status(400)
//             .json({ 
//                 message : "Email is required" 
//             });
//     }

//     if (!password) {
//         return res
//             .status(400)
//             .json({ 
//                 message : "Password is required" 
//             });
//     }
    
//     const userInfo = await User.findOne({ email : email });

//     if (!userInfo) {
//         return res
//             .status(400)
//             .json({
//                 message : "User not found"
//             });
//     }

//     if (userInfo.email == email && userInfo.password == password) {
//         const user = { user : userInfo };
//         const accessToken = jwt.sign(
//             user, 
//             process.env.ACCESS_TOKEN_SECRET, {
//             expiresIn : "36000m",
//         });

//         return res.json({
//             error : false,
//             message : "Login Successful",
//             email,
//             accessToken,
//         });
//     } else {
//         return res.status(400).json({
//             error : true,
//             message : "Invalid Credentials",
//         });
//     }

// });

// // Get User

// app.get("/get-user", authenticateToken, async (req, res) => {

//     const { user } = req.user;
//     console.log(user);

//     const isUser = await User.findOne({ _id : user._id});
//     console.log(isUser);

//     if (!user) {
//         return res.sendStatus(401);
//     }

//     return res.json({
//         user : {
//             fullName : isUser.fullName,
//             email : isUser.email,
//             _id : isUser._id,
//             createdOn : isUser.createdOn
//         },
//         message : ""
//     });
// });


// // Add Notes

// app.post("/add-note", authenticateToken, async (req, res) => {
    
//     const { title, content, tags } = req.body;
//     const { user } = req.user;

//     console.log(req.user);

//     console.log(title);
//     console.log(content);
//     console.log(user);
//     console.log(user._id);

//     if (!title) {
//         return res 
//             .status(400)
//             .json({
//                 error : true,
//                 message : "Title is required"
//             });
//     }

//     if (!content) {
//         return res
//             .status(400)
//             .json({
//                 error : true,
//                 message : "Content is required"
//             })
//     }

//     try {
//         const note = new Note({
//             title,
//             content,
//             tags : tags || [],
//             userId : user._id,
//         });

//         await note.save();
//         console.log('Note saved:', note);

//         return res.json({
//             error : false,
//             note,
//             message : "Note added successfully"
//         });

//     } catch (error) {
//         return res
//             .status(500)
//             .json({
//                 error : true,
//                 message : "Internal Server Error",
//             });
//     }
// });

// // Edit Note

// app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
//     const noteId = req.params.noteId;
//     const { title, content, tags, isPinnned } = req.body;
//     const { user } = req.user;

//     if (!title && !content && !tags) {
//         return res 
//             .status(400)
//             .json({
//                 error : true, 
//                 message : "No changes provided"
//             });
//     }

//     try {
//         const note = await Note.findOne({ _id : noteId, userId : user._id });

//         if (!note) {
//             return res
//                 .status(404)
//                 .json({
//                     error : true,
//                     message : "Note not found"
//                 });
//         }

//         if (title) note.title = title;
//         if (content) note.content = content;
//         if (tags) note.tags = tags;
//         if (isPinnned) note.isPinned = isPinnned;

//         await note.save();
//         console.log('Note Updated:', note);

//         return res.json({
//             error : false,
//             note,
//             message : "Note updated successfully"
//         });

//     } catch (error) {
//         return res
//             .status(500)
//             .json({
//                 error : true,
//                 message : "Internal Server Error"
//             });
//     }
// });

// // Get All Notes

// app.get("/get-all-notes/", authenticateToken, async (req, res) => {

//     const { user } = req.user;

//     try {
        
//         const notes = await Note.find({ userId : user._id }).sort({ isPinned : -1 });

//         return res.json({
//             error : false,
//             notes,
//             message : "All notes retrieved successfully"
//         });
        
//     } catch (error) {
//         return res
//             .status(500)
//             .json({
//                 error : true,
//                 message : "Internal Server Error"
//             });
//     }
// });

// // Delete Note

// app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
//     const noteId = req.params.noteId;
//     const { user } = req.user;

//     try {

//         const note = await Note.findOne({ _id : noteId, userId : user._id });

//         if (!note) {
//             return res
//                 .status(404)
//                 .json({
//                     error : true,
//                     message : "Note not found"
//                 });
//         }

//         await Note.deleteOne({ _id : noteId, userId : user._id });

//         return res.json({
//             error : false,
//             message : "Note deleted successfully"
//         });

//     } catch (error) {
//         return res
//             .status(500)
//             .json({
//                 error : true,
//                 message : "Internal Server Error"
//             });
//     }
// });

// // Update isPinned 

// app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
//     const noteId = req.params.noteId;
//     const { isPinned } = req.body;
//     const { user } = req.user;

//     try {
//         const note = await Note.findOne({ _id : noteId, userId : user._id });

//         if (!note) {
//             return res
//                 .status(404)
//                 .json({
//                     error : true,
//                     message : "Note not found"
//                 });
//         }

//         console.log(note.isPinned);
        
//         note.isPinned = isPinned;

//         await note.save();
//         console.log('isPinned Updated:', note.isPinned);

//         return res.json({
//             error : false,
//             note,
//             message : "isPinned updated successfully"
//         });

//     } catch (error) {
//         return res
//             .status(500)
//             .json({
//                 error : true,
//                 message : "Internal Server Error"
//             });
//     }
// });

// // Search Notes

// app.get("/search-notes/", authenticateToken, async (req, res) => {
    
//     const { user } = req.user;
//     const { query } = req.query;

//     if (!query) {
//         return res
//         .status(400)
//         .json({ 
//             error : true,
//             message : "Search query is required" 
//         });
//     }
 
//     try {
//         const matchingNotes = await Note.find({
//            userId : user._id,
//            $or : [
//                 { title : { $regex : new RegExp( query, "i" ) } },
//                 { content : { $regex : new RegExp( query, "i" ) } },
//            ], 
//         });

//         return res.json({
//             error : false,
//             notes : matchingNotes,
//             message : "Notes matching the search query retrieved successfully"
//         });

//     } catch (error) {
//         return res
//             .status(500)
//             .json({
//                 error : true,
//                 message : "Internal Server Error"
//             });
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running in port ${port}.`)
// });

// export default app;





// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import { google } from "googleapis";
// import { authenticateToken } from "./utilites.js";
// import User from "./models/user.model.js";
// import Note from "./models/note.model.js";
// import { OAuth2Client } from 'google-auth-library';

// dotenv.config();

// // Connect to MongoDB
// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log('MongoDB connected...');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }

// connectDB();

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(cors({ origin: "*" }));

// app.get("/", (req, res) => {
//     res.json({ data: "Hello" });
// });

// // Generate OTP
// const generateOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // OAuth2 client setup
// const oauth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URI
// );

// // Set default credentials if refresh token is available
// if (process.env.REFRESH_TOKEN) {
//     oauth2Client.setCredentials({
//         refresh_token: process.env.REFRESH_TOKEN
//     });
// }

// // For full access
// const SCOPES = ['https://mail.google.com/', 'profile', 'email'];

// // Function to refresh access token
// async function refreshToken(oauth2Client) {
//     try {
//         const { tokens } = await oauth2Client.refreshAccessToken();
//         oauth2Client.setCredentials(tokens);
//         console.log('New Access Token:', tokens.access_token);
//         console.log('New Refresh Token:', tokens.refresh_token);
//         return tokens;
//     } catch (error) {
//         console.error('Error refreshing access token:', error);
//         throw error;
//     }
// }

// // Function to send an email
// async function sendEmail(to, subject, htmlContent) {
//     try {
//         const accessToken = await refreshAccessTokenIfNeeded();
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 type: 'OAuth2',
//                 user: process.env.EMAIL_USER,
//                 clientId: process.env.CLIENT_ID,
//                 clientSecret: process.env.CLIENT_SECRET,
//                 refreshToken: process.env.REFRESH_TOKEN,
//                 accessToken: accessToken,
//             },
//         });

//         const mailOptions = {
//             from: `Keeper Notes <${process.env.EMAIL_USER}>`, // Display name and email
//             to: to,
//             subject: subject,
//             html: htmlContent, // Use HTML content instead of text
//         };

//         await transporter.sendMail(mailOptions);
//         console.log('Email sent to:', to);
//     } catch (error) {
//         console.error('Error sending email:', error);
//         throw error;
//     }
// }


// async function refreshAccessTokenIfNeeded() {
//     try {
//         const tokenInfo = await oauth2Client.getAccessToken();

//         // Log the token information to understand its structure
//         console.log('Token Info:', tokenInfo);

//         if (tokenInfo.res && tokenInfo.res.data && tokenInfo.res.data.expires_in < 60) {
//             console.log('Token is about to expire, refreshing...');
//             const tokens = await refreshToken(oauth2Client);
//             return tokens.access_token;
//         }

//         return tokenInfo.token;
//     } catch (error) {
//         console.error('Error checking access token:', error);
//         throw error;
//     }
// }

// // Generate OAuth2 authorization URL
// app.get('/auth', (req, res) => {
//     const authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline', // Ensures a refresh token is received
//         scope: SCOPES,
//         prompt: 'consent' // Forces the consent screen to reappear and provide a new refresh token
//     });
//     res.redirect(authUrl);
// });

// // Handle OAuth2 callback
// app.get('/oauth2callback', async (req, res) => {
//     const { code } = req.query;
//     console.log('Authorization code received:', code);

//     try {
//         const { tokens } = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);
//         console.log('Tokens acquired:', tokens);

//         const accessToken = tokens.access_token;
//         const refreshToken = tokens.refresh_token;
//         console.log('Access Token:', accessToken);

//         if (refreshToken) {
//             console.log('Securely storing Refresh Token:', refreshToken);
//         } else {
//             console.warn('No refresh token received. This may happen if the user has previously authorized the application.');
//         }

//         res.send('Authentication successful! You can close this tab.');

//     } catch (error) {
//         console.error('Error retrieving tokens:', error);
//         res.status(500).send('Error authenticating');
//     }
// });


// // Refresh token endpoint
// app.get('/refresh-token', async (req, res) => {
//     try {
//         const newTokens = await refreshToken(oauth2Client);
        
//         if (newTokens.refresh_token) {
//             oauth2Client.setCredentials({ refresh_token: newTokens.refresh_token });
//             console.log('New Refresh Token stored securely:', newTokens.refresh_token);
//         }
//         res.send('Token refreshed successfully.');
//     } catch (error) {
//         res.status(500).send('Error refreshing token. Please reauthenticate.');
//     }
// });

// app.post("/google-login", async (req, res) => {
//     const { token } = req.body;

//     try {
//         const ticket = await googleClient.verifyIdToken({
//             idToken: token,
//             audience: process.env.GOOGLE_CLIENT_ID,
//         });

//         const payload = ticket.getPayload();
//         const { sub, email, name } = payload;

//         let user = await User.findOne({ email });

//         if (!user) {
//             // Create a new user if not exists
//             user = new User({
//                 googleId: sub,
//                 email,
//                 fullName: name,
//                 verified: true,
//                 // No password required for Google login
//             });
//             await user.save();
//         }

//         const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

//         res.status(200).json({
//             success: true,
//             accessToken,
//         });
//     } catch (error) {
//         console.error("Google Login Error:", error);
//         res.status(500).json({ message: "Google login failed. Please try again." });
//     }
// });

// // Create Account
// app.post("/create-account", async (req, res) => {
//     const { fullName, email, password } = req.body;

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ 
//                 error: true, 
//                 message: "User already exists" 
//             });
//         }

//         const otp = generateOtp();

//         // Save user with OTP and verified flag to the database
//         const user = new User({ 
//             fullName, 
//             email, 
//             password, 
//             otp, 
//             verified: false 
//         });

//         await user.save();

//         const emailHTMLContent = `
//             <div style="background-color: #f0f0f0; padding: 20px; font-family: Arial, sans-serif; color: #333;">
//                 <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//                     <h2 style="color: #007BFF;">Hello ${fullName},</h2>
//                     <p>We received a request to create an account with this email address.</p>
//                     <p>Your OTP is: <strong style="color: #008080;">${otp}</strong></p>
//                     <p>If you did not make this request, please ignore this email.</p>
//                     <p>For assistance, contact our <a href="mailto:support@keepernotes.com" style="color: #007BFF;">support team</a>.</p>
//                     <br>
//                     <img src="https://raw.githubusercontent.com/Vasanth-192121/note-app/main/client/src/assets/keeper-notes-logo.jpeg" alt="Keeper Notes Logo" style="width:100px; display:block; margin:auto;">
//                     <p style="text-align: center;">Best regards,<br><strong>The Keeper Notes Team</strong></p>
//                 </div>
//             </div>
//         `;

//         await sendEmail(email, 'OTP Verification - Keeper Notes Account', emailHTMLContent);

//         res.status(200).json({ 
//             success: true, 
//             message: "OTP sent to your email" 
//         });
//     } catch (error) {
//         console.error("Error sending OTP:", error);
//         res.status(500).json({ 
//             error: true, 
//             message: "Error sending OTP" 
//         });
//     }
// });


// // Verify OTP for Account Creation
// app.post("/verify-otp", async (req, res) => {
//     const { email, otp } = req.body;


//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ 
//                 error: true, 
//                 message: "User not found" 
//             });
//         }

//         if (user.otp !== otp) {
//             return res.status(400).json({ 
//                 error: true, 
//                 message: "Invalid OTP" 
//             });
//         }

//         // Clear OTP and set verified flag to true after verification
//         user.otp = null;
//         user.verified = true;

//         await user.save();

//         // Generate JWT token
//         const token = jwt.sign(
//             { user }, 
//             process.env.ACCESS_TOKEN_SECRET, 
//             { expiresIn: "1h" }
//         );

//         res.status(200).json({ 
//             success: true, 
//             accessToken: token 
//         });

//     } catch (error) {
//         console.error("Error verifying OTP:", error);
//         res.status(500).json({ 
//             error: true, 
//             message: `Error verifying OTP: ${error.message}` 
//         });
//     }
// });

// // Login Account
// app.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ 
//             message: "Email and Password are required" 
//         });
//     }

//     const userInfo = await User.findOne({ email, verified: true });

//     if (!userInfo) {
//         return res.status(400).json({ 
//             message: "User not found or not verified" 
//         });
//     }

//     if (userInfo.email === email && userInfo.password === password) {

//         const user = { user: userInfo };

//         const accessToken = jwt.sign(
//             user, 
//             process.env.ACCESS_TOKEN_SECRET, 
//             { expiresIn: "36000m" }
//         );

//         return res.json({
//             error: false,
//             message: "Login Successful",
//             email,
//             accessToken,
//         });
//     } else {
//         return res.status(400).json({
//             error: true,
//             message: "Invalid Credentials",
//         });
//     }
// });

// // Forgot Password
// app.post("/forgot-password", async (req, res) => {
//     const { email, name } = req.body;

//     const user = await User.findOne({ email, fullName: name });

//     if (!user) {
//         return res.status(404).json({ 
//             message: 'No account found with that email and name.' 
//         });
//     }

//     try {
//         const accessToken = await refreshAccessTokenIfNeeded();
//         console.log('Access Token:', accessToken);

//         if (!accessToken) {
//             return res.status(500).json({ 
//                 message: 'Access token is not available. Please reauthenticate.' 
//             });
//         }

//         const emailHTMLContent = `
//             <div style="background-color: #f0f0f0; padding: 20px; font-family: Arial, sans-serif; color: #333;">
//                 <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
//                     <h2 style="color: #007BFF;">Hello ${name},</h2>
//                     <p>We received a request to retrieve your password for your <strong>Keeper Notes</strong> account.</p>
//                     <p>Your password is: <strong style="color: #008080;">${user.password}</strong></p>
//                     <p>If you did not make this request, please ignore this email. For security purposes, we recommend that you change your password after logging in.</p>
//                     <p>For assistance, contact our <a href="mailto:support@keepernotes.com" style="color: #007BFF;">support team</a>.</p>
//                     <br>
//                     <img src="https://raw.githubusercontent.com/Vasanth-192121/note-app/main/client/src/assets/keeper-notes-logo.jpeg" alt="Keeper Notes Logo" style="width:100px; display:block; margin:auto;">
//                     <p style="text-align: center;">Best regards,<br><strong>The Keeper Notes Team</strong></p>
//                 </div>
//             </div>
//         `;

//         await sendEmail(email, 'Password Recovery - Keeper Notes Account', emailHTMLContent);

//         res.status(200).json({ 
//             success: true, 
//             message: 'Password has been sent to your email address.' 
//         });

//     } catch (error) {
//         console.error('Error retrieving access token:', error);
//         res.status(500).json({ 
//             message: 'Error retrieving access token. Please reauthenticate.' 
//         });
//     }
// });


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import { google } from "googleapis";
// import { authenticateToken } from "./utilites.js";
// import User from "./models/user.model.js";
// import Note from "./models/note.model.js";
// import { OAuth2Client } from 'google-auth-library';
// import cron from 'node-cron';
// import rateLimiter from 'express-rate-limit';
// import helmet from 'helmet'

// dotenv.config();

// // Connect to MongoDB
// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log('MongoDB connected...');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }

// connectDB();

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(cors({ origin: "*" }));

// // Apply rate limiting 
// const limiter = rateLimiter({ 
//     windowMs: 15 * 60 * 1000, // 15 minutes 
//     max: 100 // Limit each IP to 100 requests per windowMs 
// }); 

// app.use(limiter);
// app.use(helmet());

// app.get("/", (req, res) => {
//     res.json({ data: "Hello" });
// });

// // Generate OTP
// const generateOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // OAuth2 client setup
// const oauth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URI
// );

// // Set default credentials if refresh token is available
// if (process.env.REFRESH_TOKEN) {
//     oauth2Client.setCredentials({
//         refresh_token: process.env.REFRESH_TOKEN
//     });
// }

// // For full access
// const SCOPES = ['https://mail.google.com/', 'profile', 'email'];

// // Function to refresh access token
// async function refreshToken(oauth2Client) {
//     try {
//         const  tokens  = await oauth2Client.refreshAccessToken();
//         oauth2Client.setCredentials(tokens);
//         // console.log("Generated Token : ",tokens);
//         console.log('New Access Token:', tokens.credentials.access_token);
//         if (tokens.credentials.refresh_token) {
//             console.log('New Refresh Token:', tokens.credentials.refresh_token);
//         }
//         return tokens;
//     } catch (error) {
//         console.error('Error refreshing access token:', error);
//         throw error;
//     }
// }

//     // Step 3: Schedule the cron job to refresh tokens every hour
//     cron.schedule('*/30 * * * * *', async () => {
//         try {
//             const tokens = await refreshToken(oauth2Client);
//             // console.log('Tokens refreshed successfully:', tokens);
//         } catch (error) {
//             console.error('Error refreshing tokens:', error);
//         }
//     });

//     // Step 2: Define the refreshAccessTokenIfNeeded function
//     async function refreshAccessTokenIfNeeded() {
//         try {
//             const tokenInfo = await oauth2Client.getAccessToken();

//             if (!tokenInfo || !tokenInfo.token) {
//                 throw new Error('No access token available');
//             }

//             // If the token is about to expire in less than 60 seconds, refresh it
//             if (tokenInfo.res && tokenInfo.res.data && tokenInfo.res.data.expires_in < 60) {
//                 console.log('Token is about to expire, refreshing...');
//                 const tokens = await refreshToken(oauth2Client);
//                 return tokens.access_token;
//             }

//             return tokenInfo.token;
//         } catch (error) {
//             console.error('Error checking access token:', error);

//             // Handle token invalidation case
//             if (error.response && error.response.data && error.response.data.error === 'invalid_grant') {
//                 console.log('Token invalid or expired. Prompting re-authentication.');
//                 // Implement logic to prompt user re-authentication
//             }

//             throw error;
//         }
//     }

//     // Generate OAuth2 authorization URL
//     app.get('/auth', (req, res) => {
//         const authUrl = oauth2Client.generateAuthUrl({
//             access_type: 'offline', // Ensures a refresh token is received
//             scope: SCOPES,
//             prompt: 'consent' // Forces the consent screen to reappear and provide a new refresh token
//         });
//         res.redirect(authUrl);
//     });

//     // Handle OAuth2 callback
//     app.get('/oauth2callback', async (req, res) => {
//         const { code } = req.query;
//         console.log('Authorization code received:', code);

//         try {
//             const { tokens } = await oauth2Client.getToken(code);
//             oauth2Client.setCredentials(tokens);
//             console.log('Tokens acquired:', tokens);

//             const accessToken = tokens.access_token;
//             const refreshToken = tokens.refresh_token;
//             console.log('Access Token:', accessToken);

//             if (refreshToken) {
//                 console.log('Securely storing Refresh Token:', refreshToken);
//             } else {
//                 console.warn('No refresh token received. This may happen if the user has previously authorized the application.');
//             }

//             // // Send success message directly
//             // res.send('Authentication successful! You can now use the application.');

//             // Redirect to main application with a success message
//             res.redirect('/auth-success');

//         } catch (error) {
//             console.error('Error retrieving tokens:', error);
//             res.status(500).send('Error authenticating');
//         }
//     });

//     // Success route
//     app.get('/auth-success', (req, res) => {
//         res.send('Authentication successful! You can now use the application.');
//     });

//     // Refresh token endpoint
//     app.get('/refresh-token', async (req, res) => {
//         try {
//             const newTokens = await refreshToken(oauth2Client);
//             console.log(newTokens);
//             console.log(newTokens.credentials.refresh_token);
            
//             if (newTokens.credentials.refresh_token) {
//                 oauth2Client.setCredentials({ refresh_token: newTokens.credentials.refresh_token });
//                 console.log('New Refresh Token stored securely:', newTokens.credentials.refresh_token);
//             }
//             res.send('Token refreshed successfully.');
//         } catch (error) {
//             res.status(500).send('Error refreshing token. Please reauthenticate.');
//         }
//     });



// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import { google } from "googleapis";
// import { authenticateToken } from "./utilites.js";
// import User from "./models/user.model.js";
// import Note from "./models/note.model.js";
// import { OAuth2Client } from 'google-auth-library';
// import cron from 'node-cron';
// import rateLimiter from 'express-rate-limit';
// import helmet from 'helmet'

// dotenv.config();

// // Connect to MongoDB
// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log('MongoDB connected...');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }

// connectDB();

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(cors({ origin: "*" }));

// // Apply rate limiting 
// const limiter = rateLimiter({ 
//     windowMs: 15 * 60 * 1000, // 15 minutes 
//     max: 100 // Limit each IP to 100 requests per windowMs 
// }); 

// app.use(limiter);
// app.use(helmet());

// app.get("/", (req, res) => {
//     res.json({ data: "Hello" });
// });

// // Generate OTP
// const generateOtp = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// };

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // OAuth2 client setup
// const oauth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URI
// );

// // Variable to store refresh token
// let storedRefreshToken = process.env.REFRESH_TOKEN;

// // Set default credentials if refresh token is available
// if (storedRefreshToken) {
//     oauth2Client.setCredentials({
//         refresh_token: storedRefreshToken
//     });
// }

// // For full access
// const SCOPES = ['https://mail.google.com/', 'profile', 'email'];

// // Function to refresh access token
// async function refreshToken(oauth2Client) {
//     try {
//         const { credentials } = await oauth2Client.refreshAccessToken();
//         oauth2Client.setCredentials(credentials);

//         console.log('New Access Token:', credentials.access_token);
//         if (credentials.refresh_token) {
//             // Update the stored refresh token
//             storedRefreshToken = credentials.refresh_token;
//             console.log('New Refresh Token stored securely:', storedRefreshToken);
//         }
//         return credentials;
//     } catch (error) {
//         console.error('Error refreshing access token:', error);
//         throw error;
//     }
// }

// // Function to refresh access token if needed
// async function refreshAccessTokenIfNeeded() {
//     try {
//         const tokenInfo = await oauth2Client.getAccessToken();

//         if (!tokenInfo || !tokenInfo.token) {
//             throw new Error('No access token available');
//         }

//         const tokenExpiryTime = 60; // Token expiry time in seconds

//         // If the token is about to expire in less than the specified time, refresh it
//         if (tokenInfo.res && tokenInfo.res.data && tokenInfo.res.data.expires_in < tokenExpiryTime) {
//             console.log('Token is about to expire, refreshing...');
//             const tokens = await refreshToken(oauth2Client);
//             return tokens.access_token;
//         }

//         return tokenInfo.token;
//     } catch (error) {
//         console.error('Error checking access token:', error);

//         // Handle token invalidation case
//         if (error.response && error.response.data && error.response.data.error === 'invalid_grant') {
//             console.log('Token invalid or expired. Prompting re-authentication.');
//             // Implement logic to prompt user re-authentication
//         }

//         throw error;
//     }
// }

// // Schedule the cron job to refresh tokens every 30 minutes
// cron.schedule('*/30 * * * *', async () => {
//     try {
//         await refreshToken(oauth2Client);
//     } catch (error) {
//         console.error('Error refreshing tokens:', error);
//     }
// });

// // Generate OAuth2 authorization URL
// app.get('/auth', (req, res) => {
//     const authUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline', // Ensures a refresh token is received
//         scope: SCOPES,
//         prompt: 'consent' // Forces the consent screen to reappear and provide a new refresh token
//     });
//     res.redirect(authUrl);
// });

// // Handle OAuth2 callback
// app.get('/oauth2callback', async (req, res) => {
//     const { code } = req.query;
//     console.log('Authorization code received:', code);

//     try {
//         const { tokens } = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);
//         console.log('Tokens acquired:', tokens);

//         const accessToken = tokens.access_token;
//         const refreshToken = tokens.refresh_token;
//         console.log('Access Token:', accessToken);

//         if (refreshToken) {
//             storedRefreshToken = refreshToken; // Update the stored refresh token
//             console.log('Securely storing Refresh Token:', storedRefreshToken);
//         } else {
//             console.warn('No refresh token received. This may happen if the user has previously authorized the application.');
//         }

//         // Redirect to main application with a success message
//         res.redirect('/auth-success');

//     } catch (error) {
//         console.error('Error retrieving tokens:', error);
//         res.status(500).send('Error authenticating');
//     }
// });

// // Success route
// app.get('/auth-success', (req, res) => {
//     res.send('Authentication successful! You can now use the application.');
// });

// // Refresh token endpoint
// app.get('/refresh-token', async (req, res) => {
//     try {
//         const newTokens = await refreshToken(oauth2Client);
//         if (newTokens.refresh_token) {
//             storedRefreshToken = newTokens.refresh_token; // Update the stored refresh token
//             console.log('New Refresh Token stored securely:', storedRefreshToken);
//         }
//         res.send('Token refreshed successfully.');
//     } catch (error) {
//         res.status(500).send('Error refreshing token. Please reauthenticate.');
//     }
// });





import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { authenticateToken } from "./utilites.js";
import User from "./models/user.model.js";
import Note from "./models/note.model.js";
import Token from "./models/token.model.js"; // Import Token model
import { OAuth2Client } from 'google-auth-library';
import cron from 'node-cron';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet'

dotenv.config();

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));

// Apply rate limiting 
const limiter = rateLimiter({ 
    windowMs: 15 * 60 * 1000, // 15 minutes 
    max: 100 // Limit each IP to 100 requests per windowMs 
}); 

app.use(limiter);
app.use(helmet());

app.get("/", (req, res) => {
    res.json({ data: "Hello" });
});

// Generate OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// For full access
const SCOPES = ['https://mail.google.com/', 'profile', 'email'];

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// Retrieve the refresh token from the database
async function getStoredRefreshToken() {
    const tokenDoc = await Token.findOne();
    return tokenDoc ? tokenDoc.refreshToken : null;
}

// Initialize OAuth2 client with refresh token from database
async function initializeOAuthClient() {
    const storedRefreshToken = await getStoredRefreshToken();
    if (storedRefreshToken) {
        oauth2Client.setCredentials({
            refresh_token: storedRefreshToken
        });
    } else {
        console.log('No stored refresh token found. User needs to re-authenticate.');
    }
}

initializeOAuthClient();

// Function to refresh access token
async function refreshToken(oauth2Client) {
    try {
        const { credentials } = await oauth2Client.refreshAccessToken();
        oauth2Client.setCredentials(credentials);

        console.log('New Access Token:', credentials.access_token);
        if (credentials.refresh_token) {
            // Update the refresh token in the database
            await Token.updateOne({}, { refreshToken: credentials.refresh_token }, { upsert: true });
            console.log('New Refresh Token stored securely:', credentials.refresh_token);
        }
        return credentials;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
}

// Function to refresh access token if needed
async function refreshAccessTokenIfNeeded() {
    try {
        const tokenInfo = await oauth2Client.getAccessToken();

        if (!tokenInfo || !tokenInfo.token) {
            throw new Error('No access token available');
        }

        const tokenExpiryTime = 60; // Token expiry time in seconds

        // If the token is about to expire in less than the specified time, refresh it
        if (tokenInfo.res && tokenInfo.res.data && tokenInfo.res.data.expires_in < tokenExpiryTime) {
            console.log('Token is about to expire, refreshing...');
            const tokens = await refreshToken(oauth2Client);
            return tokens.access_token;
        }

        return tokenInfo.token;
    } catch (error) {
        console.error('Error checking access token:', error);

        // Handle token invalidation case
        if (error.response && error.response.data && error.response.data.error === 'invalid_grant') {
            console.log('Token invalid or expired. Prompting re-authentication.');
            // Implement logic to prompt user re-authentication
        }

        throw error;
    }
}

// Schedule the cron job to refresh tokens every 30 minutes
cron.schedule('*/30 * * * *', async () => {
    try {
        await refreshToken(oauth2Client);
    } catch (error) {
        console.error('Error refreshing tokens:', error);
    }
});

// Generate OAuth2 authorization URL
app.get('/auth', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', // Ensures a refresh token is received
        scope: SCOPES,
        prompt: 'consent' // Forces the consent screen to reappear and provide a new refresh token
    });
    res.redirect(authUrl);
});

// Handle OAuth2 callback
app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;
    console.log('Authorization code received:', code);

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        console.log('Tokens acquired:', tokens);

        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token;
        console.log('Access Token:', accessToken);

        if (refreshToken) {
            await Token.updateOne({}, { refreshToken }, { upsert: true }); // Update the stored refresh token
            console.log('Securely storing Refresh Token:', refreshToken);
        } else {
            console.warn('No refresh token received. This may happen if the user has previously authorized the application.');
        }

        // Redirect to main application with a success message
        res.redirect('/auth-success');

    } catch (error) {
        console.error('Error retrieving tokens:', error);
        res.status(500).send('Error authenticating');
    }
});

// Success route
app.get('/auth-success', (req, res) => {
    res.send('Authentication successful! You can now use the application.');
});

// Refresh token endpoint
app.get('/refresh-token', async (req, res) => {
    try {
        const newTokens = await refreshToken(oauth2Client);
        if (newTokens.refresh_token) {
            await Token.updateOne({}, { refreshToken: newTokens.refresh_token }, { upsert: true }); // Update the stored refresh token
            console.log('New Refresh Token stored securely:', newTokens.refresh_token);
        }
        res.send('Token refreshed successfully.');
    } catch (error) {
        res.status(500).send('Error refreshing token. Please reauthenticate.');
    }
});

    // Function to send an email
    async function sendEmail(to, subject, htmlContent) {
        try {
            const accessToken = await refreshAccessTokenIfNeeded();
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.EMAIL_USER,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken,
                },
            });

            const mailOptions = {
                from: `Keeper Notes <${process.env.EMAIL_USER}>`, // Display name and email
                to: to,
                subject: subject,
                html: htmlContent, // Use HTML content instead of text
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent to:', to);
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }

    app.post("/google-login", async (req, res) => {
        const { token } = req.body;

        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            const { sub, email, name } = payload;

            let user = await User.findOne({ email });

            if (!user) {
                // Create a new user if not exists
                user = new User({
                    googleId: sub,
                    email,
                    fullName: name,
                    verified: true,
                    // No password required for Google login
                });
                await user.save();
            }

            const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

            res.status(200).json({
                success: true,
                accessToken,
            });
        } catch (error) {
            console.error("Google Login Error:", error);
            res.status(500).json({ message: "Google login failed. Please try again." });
        }
    });

    // Create Account
    app.post("/create-account", async (req, res) => {
        const { fullName, email, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ 
                    error: true, 
                    message: "User already exists" 
                });
            }

            const otp = generateOtp();

            // Save user with OTP and verified flag to the database
            const user = new User({ 
                fullName, 
                email, 
                password, 
                otp, 
                verified: false 
            });

            await user.save();

            const emailHTMLContent = `
                <div style="background-color: #f0f0f0; padding: 20px; font-family: Arial, sans-serif; color: #333;">
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #007BFF;">Hello ${fullName},</h2>
                        <p>We received a request to create an account with this email address.</p>
                        <p>Your OTP is: <strong style="color: #008080;">${otp}</strong></p>
                        <p>If you did not make this request, please ignore this email.</p>
                        <p>For assistance, contact our <a href="mailto:support@keepernotes.com" style="color: #007BFF;">support team</a>.</p>
                        <br>
                        <img src="https://raw.githubusercontent.com/Vasanth-192121/note-app/main/client/src/assets/keeper-notes-logo.jpeg" alt="Keeper Notes Logo" style="width:100px; display:block; margin:auto;">
                        <p style="text-align: center;">Best regards,<br><strong>The Keeper Notes Team</strong></p>
                    </div>
                </div>
            `;

            await sendEmail(email, 'OTP Verification - Keeper Notes Account', emailHTMLContent);

            res.status(200).json({ 
                success: true, 
                message: "OTP sent to your email" 
            });
        } catch (error) {
            console.error("Error sending OTP:", error);
            res.status(500).json({ 
                error: true, 
                message: "Error sending OTP" 
            });
        }
    });

    // Verify OTP for Account Creation
    app.post("/verify-otp", async (req, res) => {
        const { email, otp } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ 
                    error: true, 
                    message: "User not found" 
                });
            }

            if (user.otp !== otp) {
                return res.status(400).json({ 
                    error: true, 
                    message: "Invalid OTP" 
                });
            }

            // Clear OTP and set verified flag to true after verification
            user.otp = null;
            user.verified = true;

            await user.save();

            // Generate JWT token
            const token = jwt.sign(
                { user }, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: "1h" }
            );

            res.status(200).json({ 
                success: true, 
                accessToken: token 
            });

        } catch (error) {
            console.error("Error verifying OTP:", error);
            res.status(500).json({ 
                error: true, 
                message: `Error verifying OTP: ${error.message}` 
            });
        }
    });

    // Login Account
    app.post("/login", async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: "Email and Password are required" 
            });
        }

        const userInfo = await User.findOne({ email, verified: true });

        if (!userInfo) {
            return res.status(400).json({ 
                message: "User not found or not verified" 
            });
        }

        if (userInfo.password === password) {
            const user = { user: userInfo };

            const accessToken = jwt.sign(
                user, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: "36000m" } // This seems quite long; consider a more secure duration
            );

            return res.json({
                error: false,
                message: "Login Successful",
                email,
                accessToken,
            });
        } else {
            return res.status(400).json({
                error: true,
                message: "Invalid Credentials",
            });
        }
    });

    // Forgot Password
    app.post("/forgot-password", async (req, res) => {
        const { email, name } = req.body;

        const user = await User.findOne({ email, fullName: name });

        if (!user) {
            return res.status(404).json({ 
                message: 'No account found with that email and name.' 
            });
        }

        try {
            const accessToken = await refreshAccessTokenIfNeeded();
            console.log('Access Token:', accessToken);

            if (!accessToken) {
                return res.status(500).json({ 
                    message: 'Access token is not available. Please reauthenticate.' 
                });
            }

            const emailHTMLContent = `
                <div style="background-color: #f0f0f0; padding: 20px; font-family: Arial, sans-serif; color: #333;">
                    <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #007BFF;">Hello ${name},</h2>
                        <p>We received a request to retrieve your password for your <strong>Keeper Notes</strong> account.</p>
                        <p>Your password is: <strong style="color: #008080;">${user.password}</strong></p>
                        <p>If you did not make this request, please ignore this email. For security purposes, we recommend that you change your password after logging in.</p>
                        <p>For assistance, contact our <a href="mailto:support@keepernotes.com" style="color: #007BFF;">support team</a>.</p>
                        <br>
                        <img src="https://raw.githubusercontent.com/Vasanth-192121/note-app/main/client/src/assets/keeper-notes-logo.jpeg" alt="Keeper Notes Logo" style="width:100px; display:block; margin:auto;">
                        <p style="text-align: center;">Best regards,<br><strong>The Keeper Notes Team</strong></p>
                    </div>
                </div>
            `;

            await sendEmail(email, 'Password Recovery - Keeper Notes Account', emailHTMLContent);

            res.status(200).json({ 
                success: true, 
                message: 'Password has been sent to your email address.' 
            });

        } catch (error) {
            console.error('Error retrieving access token:', error);
            res.status(500).json({ 
                message: 'Error retrieving access token. Please reauthenticate.' 
            });
        }
    });


// Get User

app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;
    if (!user) {
        return res.sendStatus(401);
    }

    // console.log('User from token:', user);

    try {
        const isUser = await User.findOne({ _id: user._id });
        if (!isUser) {
            return res.status(404).json({ 
                error: true, 
                message: "User not found" 
            });
        }

        // console.log('User found in DB:', isUser);

        return res.json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createdOn: isUser.createdOn,
            },
            message: ""
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: true, message: 'Internal server error' });
    }
});

// Add Notes

app.post("/add-note", authenticateToken, async (req, res) => {
    
    const { title, content, tags } = req.body;
    const { user } = req.user;

    console.log(req.user);

    console.log(title);
    console.log(content);
    console.log(user);
    console.log(user._id);

    if (!title) {
        return res 
            .status(400)
            .json({
                error : true,
                message : "Title is required"
            });
    }

    if (!content) {
        return res
            .status(400)
            .json({
                error : true,
                message : "Content is required"
            })
    }

    try {
        const note = new Note({
            title,
            content,
            tags : tags || [],
            userId : user._id,
        });

        await note.save();
        console.log('Note saved:', note);

        return res.json({
            error : false,
            note,
            message : "Note added successfully"
        });

    } catch (error) {
        return res
            .status(500)
            .json({
                error : true,
                message : "Internal Server Error",
            });
    }
});

// Edit Note

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinnned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res 
            .status(400)
            .json({
                error : true, 
                message : "No changes provided"
            });
    }

    try {
        const note = await Note.findOne({ _id : noteId, userId : user._id });

        if (!note) {
            return res
                .status(404)
                .json({
                    error : true,
                    message : "Note not found"
                });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinnned) note.isPinned = isPinnned;

        await note.save();
        console.log('Note Updated:', note);

        return res.json({
            error : false,
            note,
            message : "Note updated successfully"
        });

    } catch (error) {
        return res
            .status(500)
            .json({
                error : true,
                message : "Internal Server Error"
            });
    }
});

// Get All Notes

app.get("/get-all-notes/", authenticateToken, async (req, res) => {

    const { user } = req.user;

    try {
        
        const notes = await Note.find({ userId : user._id }).sort({ isPinned : -1 });

        return res.json({
            error : false,
            notes,
            message : "All notes retrieved successfully"
        });
        
    } catch (error) {
        return res
            .status(500)
            .json({
                error : true,
                message : "Internal Server Error"
            });
    }
});

// Delete Note

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {

        const note = await Note.findOne({ _id : noteId, userId : user._id });

        if (!note) {
            return res
                .status(404)
                .json({
                    error : true,
                    message : "Note not found"
                });
        }

        await Note.deleteOne({ _id : noteId, userId : user._id });

        return res.json({
            error : false,
            message : "Note deleted successfully"
        });

    } catch (error) {
        return res
            .status(500)
            .json({
                error : true,
                message : "Internal Server Error"
            });
    }
});

// Update isPinned 

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Note.findOne({ _id : noteId, userId : user._id });

        if (!note) {
            return res
                .status(404)
                .json({
                    error : true,
                    message : "Note not found"
                });
        }

        console.log(note.isPinned);
        
        note.isPinned = isPinned;

        await note.save();
        console.log('isPinned Updated:', note.isPinned);

        return res.json({
            error : false,
            note,
            message : "isPinned updated successfully"
        });

    } catch (error) {
        return res
            .status(500)
            .json({
                error : true,
                message : "Internal Server Error"
            });
    }
});

// Search Notes

app.get("/search-notes/", authenticateToken, async (req, res) => {
    
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res
        .status(400)
        .json({ 
            error : true,
            message : "Search query is required" 
        });
    }
 
    try {
        const matchingNotes = await Note.find({
           userId : user._id,
           $or : [
                { title : { $regex : new RegExp( query, "i" ) } },
                { content : { $regex : new RegExp( query, "i" ) } },
           ], 
        });

        return res.json({
            error : false,
            notes : matchingNotes,
            message : "Notes matching the search query retrieved successfully"
        });

    } catch (error) {
        return res
            .status(500)
            .json({
                error : true,
                message : "Internal Server Error"
            });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

export default app;
