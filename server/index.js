import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createRequire } from "module";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./utilites.js";
import User from "./models/user.model.js";
import Note from "./models/note.model.js"

// const require = createRequire(import.meta.url);
// const config = require("./config.json");

// async function connectDB() {
//     await mongoose.connect(config.connectionString);
//     console.log('MongoDB connected...');
// }

// connectDB();

dotenv.config();

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected...');
}

connectDB();

const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());
app.use(
    cors({
        origin : "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data : "Hello" })
});

// Create Account

app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({
            error: true,
            message: "Fullname is required"
        });
    }

    if (!email) {
        return res.status(400).json({
            error: true,
            message: "Email is required"
        });
    }

    if (!password) {
        return res.status(400).json({
            error: true,
            message: "Password is required"
        });
    }

    const isUser = await User.findOne({ email : email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullName,
        email,
        password,
    });

    await user.save();
    console.log('User saved:', user);

    const accessToken = jwt.sign(
        { user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : "36000m" }
    );

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});

// Login Account

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({ 
                message : "Email is required" 
            });
    }

    if (!password) {
        return res
            .status(400)
            .json({ 
                message : "Password is required" 
            });
    }
    
    const userInfo = await User.findOne({ email : email });

    if (!userInfo) {
        return res
            .status(400)
            .json({
                message : "User not found"
            });
    }

    if (userInfo.email == email && userInfo.password == password) {
        const user = { user : userInfo };
        const accessToken = jwt.sign(
            user, 
            process.env.ACCESS_TOKEN_SECRET, {
            expiresIn : "36000m",
        });

        return res.json({
            error : false,
            message : "Login Successful",
            email,
            accessToken,
        });
    } else {
        return res.status(400).json({
            error : true,
            message : "Invalid Credentials",
        });
    }

});

// Get User

app.get("/get-user", authenticateToken, async (req, res) => {

    const { user } = req.user;
    console.log(user);

    const isUser = await User.findOne({ _id : user._id});
    console.log(isUser);

    if (!user) {
        return res.sendStatus(401);
    }

    return res.json({
        user : {
            fullName : isUser.fullName,
            email : isUser.email,
            _id : isUser._id,
            createdOn : isUser.createdOn
        },
        message : ""
    });
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
    console.log(`Server is running in port ${port}.`)
});

export default app;
