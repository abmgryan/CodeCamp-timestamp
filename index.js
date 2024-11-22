const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



const users = [{username: 'Ryan', _id: 1}];
const workouts = [{_id: '1',description: 'run', duration: '30', date: '11/22/2024'}]



app.post('/api/users', (req, res, next) =>{
  const username = req.body.username;

  users.push({username: username, _id: users.length});

  res.json({username: username, _id: users.length});
});


app.get('/api/users', (req, res, next) =>{


  res.json(users);
});



app.post('/api/users/:_id/exercises', (req, res, next) =>{
  
  console.log('req.params._id: ' + req.params._id)
  console.log('users[req.params._id]: ' + users[Number(req.params._id)])
  
  const usernameID = req.params._id;
  const username = users[req.params._id-1].username;

  //check if date is valid
  let workoutDate = req.body.date;
  try{
    workoutDate = new Date(req.body.date);
  } catch(e) {
    console.log('Invalid Date Format');
    workoutDate = new Date();
  }
  if(!workoutDate){ workoutDate = new Date()};

  const postedDate = new Date(req.body.date);

  workouts.push({_id: usernameID, description: req.body.description, duration: req.body.duration, date: req.body.date});

  res.json({_id: usernameID, username: username, description: req.body.description, duration: req.body.duration, date: postedDate.toDateString()});
});

// app.get('/api/users/:_id/logs', (req, res, next) =>{
//   const username = users[req.params._id-1].username;


//   workoutArray = [];
//   workoutCount = 0;
//   for (let record in workouts){
//     if(workouts[record]._id == req.params._id){
//       workoutArray.push({description: workouts[record].description, duration: Number(workouts[record].duration), date: workouts[record].date});
//       workoutCount ++;
//     }
//   }


//   res.json({_id: req.params._id, username: username, count: workoutCount, logs: workoutArray})
// });


//?[from][&to][&limit]
app.get('/api/users/:_id/logs', (req, res, next) =>{
  const username = users[req.params._id-1].username;

  console.log('from: ' + req.query.from);
  console.log('to: ' + req.query.to);
  console.log('limit: ' + req.query.limit);

  workoutArray = [];
  workoutCount = 0;
  breakException = false;
  for (let record in workouts){
    if(!breakException){
      if(workouts[record]._id == req.params._id){
        if((!req.query.from || workouts[record].date >= req.query.from) && (!req.query.to || workouts[record].date <= req.query.to)){
          
          //if(workoutCount != undefined && workoutCount != null) {if(workoutCount == req.query.limit){breakException = true;};};
          

          if(workoutCount == undefined || workoutCount == null || workoutCount != req.query.limit){
          workoutArray.push({description: workouts[record].description, duration: Number(workouts[record].duration), date: new Date(workouts[record].date).toDateString()});
          workoutCount ++;
          } else {
            breakException = true;
          }
        }
      }
    }
  }


  res.json({_id: req.params._id, username: username, count: workoutCount, logs: workoutArray})
});










const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
