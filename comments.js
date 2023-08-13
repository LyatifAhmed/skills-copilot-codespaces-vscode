//Create web server using express
const express = require('express');
const app = express();
//Create a router
const router = express.Router();
//Import mongoose
const mongoose = require('mongoose');
//Import body parser
const bodyParser = require('body-parser');
//Import path
const path = require('path');
//Import models
const Comment = require('../models/Comment');
//Import controllers
const commentsController = require('../controllers/commentsController');
//Import dotenv
require('dotenv').config();

//Connect to mongoose
mongoose.connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...'));

//Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use router
app.use('/api/comments', router);

//Get all comments
router.get('/', commentsController.getAllComments);

//Get comment by id
router.get('/:id', commentsController.getCommentById);

//Create comment
router.post('/', commentsController.createComment);

//Update comment by id
router.put('/:id', commentsController.updateComment);

//Delete comment by id
router.delete('/:id', commentsController.deleteComment);

//Export router
module.exports = router;

