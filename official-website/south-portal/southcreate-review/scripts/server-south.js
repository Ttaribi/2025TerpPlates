const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001; // DIFFERENT PORT for South Dining Hall

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Local
mongoose.connect("mongodb://localhost:27017/terpplates", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected for South Dining Hall"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Define South Dining Hall Schema
const southSchema = new mongoose.Schema({
    name: String,
    comment: String,
    rating: Number,
    timestamp: { type: Date, default: Date.now }
});

const SouthComment = mongoose.model("south-comments", southSchema, "south-comments");

// Route to submit a comment for South Dining Hall
app.post("/south/submit", async (req, res) => {
    try {
        const { name, comment, rating } = req.body;
        const newComment = new SouthComment({ name, comment, rating });
        await newComment.save();
        res.status(201).json({ message: "Comment added", comment: newComment });
    } catch (error) {
        res.status(500).json({ error: "Error saving comment" });
    }
});

// Route to fetch comments for South Dining Hall
app.get("/south/comments", async (req, res) => {
    try {
        const comments = await SouthComment.find().sort({ timestamp: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Error fetching comments" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`South Dining Hall Server running on http://localhost:${PORT}`);
});
