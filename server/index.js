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

app.get("/", (req, res) => {
    res.json({ data: "Hello" });
});

// Generate OTP
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// OAuth2 client setup
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

// For full access
const SCOPES = ['https://mail.google.com/']; 


// Generate OAuth2 authorization URL
app.get('/auth', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
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

        // Log the access token and refresh token securely
        const accessToken = tokens.access_token;
        const refreshToken = tokens.refresh_token;
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);

        // TODO: Implement secure storage for refresh tokens
        console.log('Securely storing Refresh Token:', refreshToken);

        res.send('Authentication successful! You can close this tab.');

    } catch (error) {
        console.error('Error retrieving tokens:', error);
        res.status(500).send('Error authenticating');
    }
});

// Function to refresh the access token
async function refreshAccessToken() {
    try {
        const { token } = await oauth2Client.getAccessToken();
        if (!token) {
            throw new Error('No access token available');
        }
        return token;
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw new Error('Error refreshing access token');
    }
}

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

        const accessToken = await oauth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);

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

    if (userInfo.email === email && userInfo.password === password) {

        const user = { user: userInfo };

        const accessToken = jwt.sign(
            user, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: "36000m" }
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
        const accessToken = await refreshAccessToken();
        console.log('Access Token:', accessToken);

        if (!accessToken) {
            return res.status(500).json({ 
                message: 'Access token is not available. Please reauthenticate.' 
            });
        }

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
            tls: {
                rejectUnauthorized: false,
            },
            logger: true,
            debug: true,
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Recovery',
            text: `Your password is: ${user.password}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ 
                    message: 'Error sending email. Please try again later.' 
                });
            }
            console.log('Email sent:', info.response);
            res.status(200).json({ 
                success: true, 
                message: 'Password has been sent to your email address.' 
            });
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

    console.log('User from token:', user);

    try {
        const isUser = await User.findOne({ _id: user._id });
        if (!isUser) {
            return res.status(404).json({ 
                error: true, 
                message: "User not found" 
            });
        }

        console.log('User found in DB:', isUser);

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
