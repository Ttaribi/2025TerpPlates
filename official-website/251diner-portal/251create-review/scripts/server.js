const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Local
mongoose.connect("mongodb://localhost:27017/terpplates", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Dynamic Schema Function (for multiple dining halls)
const getCommentModel = (diningHall) => {
    const collectionName = `${diningHall}-comments`; // e.g., 251comments, southdiner-comments
    const schema = new mongoose.Schema({
        name: String,
        comment: String,
        rating: Number,
        timestamp: { type: Date, default: Date.now }
    });
    return mongoose.models[collectionName] || mongoose.model(collectionName, schema, collectionName);
};

// Route to submit a comment
app.post("/:diningHall/submit", async (req, res) => {
    try {
        const { name, comment, rating } = req.body;
        const { diningHall } = req.params; // Extract dining hall name from URL
        const CommentModel = getCommentModel(diningHall);

        const newComment = new CommentModel({ name, comment, rating });
        await newComment.save();
        res.status(201).json({ message: "Comment added", comment: newComment });
    } catch (error) {
        res.status(500).json({ error: "Error saving comment" });
    }
});

// Route to fetch comments for a specific dining hall
app.get("/:diningHall/comments", async (req, res) => {
    try {
        const { diningHall } = req.params;
        const CommentModel = getCommentModel(diningHall);

        const comments = await CommentModel.find().sort({ timestamp: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Error fetching comments" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
