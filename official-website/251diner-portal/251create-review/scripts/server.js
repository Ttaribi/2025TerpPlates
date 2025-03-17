import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://mtaribi18:Yewaboma4!@tmt.r7y7civ.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema
const CommentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  comment: String
});

// Create a model
const Comment = mongoose.model('Comment', CommentSchema);

// Middleware to parse JSON bodies from POST requests
app.use(bodyParser.json());

// Route to handle form submissions
app.post('/submit', (req, res) => {
  const newComment = new Comment(req.body);
  newComment.save((err, comment) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(comment);
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));