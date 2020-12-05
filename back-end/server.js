const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/meetup', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
// const multer = require('multer')
// const upload = multer({
//   dest: '../front-end/public/images/',
//   limits: {
//     fileSize: 10000000
//   }
// });

// Create a scheme for activities
const activitySchema = new mongoose.Schema({
  name: String,
  city: String,
  peopleNeeded: String,
  peopleGoing: String,
  date: String,
  address: String,
});

// Create a model for activities.
const Activity = mongoose.model('Activity', activitySchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
// app.post('/api/photos', upload.single('photo'), async (req, res) => {
//   // Just a safety check
//   if (!req.file) {
//     return res.sendStatus(400);
//   }
//   res.send({
//     path: "/images/" + req.file.filename
//   });
// });

// Get a list of all of the activities in the museum.
app.get('/api/activities', async (req, res) => {
  try {
    let activities = await Activity.find();
    res.send(activities);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

// Delete an item
app.delete('/api/activities/:id', async (req, res) => {
  try {
    await Activity.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/activities', async (req, res) => {
  const activity = new Activity({
    name: req.body.name,
    city: req.body.city,
    peopleNeeded: req.body.peopleNeeded,
    peopleGoing: req.body.peopleGoing,
    date: req.body.date,
    address: req.body.address,
  });
  try {
    await activity.save();
    res.send(activity);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/activities/:id', async(req, res) => {
  try {
    let activity = await Activity.findOne({
      _id: req.params.id
    });
    activity.peopleGoing = req.body.peopleGoing;
    activity.save();
    res.sendStatus(200);
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
