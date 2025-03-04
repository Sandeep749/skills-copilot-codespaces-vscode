// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Read file
const comments = fs.readFileSync('./comments.json', 'utf8');
const commentsArray = JSON.parse(comments);

// Get comments
app.get('/comments', (req, res) => {
  res.json(commentsArray);
});

// Post comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  commentsArray.push(newComment);

  fs.writeFileSync('./comments.json', JSON.stringify(commentsArray, null, 2), 'utf8');

  res.json(newComment);
});

// Start web server
app.listen(3000, () => {
  console.log('Web server started');
});