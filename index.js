//All Free-Code-Camp API Project source code is added to this file.
//These are all completed tests from: Back End Development and APIs Projects.
//Ryan Dougherty - Dec. 3, 2024
//
//Chapters:
//Timestamp Microservice
//Request Header Parser Microservice
//URL Shortener Microservice
//Exercise Tracker
//File Metadata Microservice






//Timestamp Microservice
//
//Purpose:
// Design an API outputs dates in UTC and String format.
//
//This one made me think a little bit. I kept receiving repeated errors no matter
//what I changed. After thoroughly debugging and logging my variables every time they changed,
//I realized it was a simple datatype error. Once I knew this and began using "Number()" for
//the UTC codes, it came together quickly.
//
//Biggest takeaway: JavaScript's assumed datatypes are incredibly convenient, but don't
//assume they are perfect.
//

var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req, res) {
  submittedDate = req.params.date
  console.log('My date = ' + submittedDate);


  if(req.params.date){
    if(new Date(submittedDate).valueOf()){

      res.json({unix: new Date(submittedDate).valueOf(), utc: new Date(submittedDate).toUTCString()});

    } else if(Number(submittedDate)){

      submittedDate = Number(submittedDate);
      res.json({unix: submittedDate, utc: new Date(submittedDate).toUTCString()});

    } else {

      res.json({error: 'Invalid Date'});

    }
  } else {
    res.json({unix: new Date().valueOf(), utc: new Date().toUTCString()});
  }
  
  
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});








//Request Header Parser Microservice
//
//Purpose:
// Design an API that outputs req information.
//
//I found this one to be straightforward. Its really just a matter of
//understanding what is sent through requests. The ip is available
//as well as a large variety of other information in the headers.
//This is something very basic when using API. In a real enivronment
//I have already used API headers and know there is so much
//more that we can do than this. But it is important to know and 
//always good to have a strong foundation of the basics.
//

require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});


app.get('/api/whoami', function (req, res) {
  
  let reqAddress = req.ip;
  let reqLanguage = req.headers['accept-language'];
  let reqSoftware = req.headers['sec-ch-ua'];
  
  res.json({ ipaddress: reqAddress, language: reqLanguage, software: reqSoftware });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});










//URL Shortener Microservice
//
//Purpose:
// Design an API that takes urls and redirects them with shortened link.
//
//This is the part of the certification that gave me the most trouble. I spent
//hours trying to figure it out, and like almost all errors I've had so far, it
//was such an easy solution. The trouble came from verifying the URLs that were
//submitted. Every time the protocol (https:, http, etc.) was invalid, the test
//would fail. After reading into URL Objects ("new URL()"), the errors were
//easily fixed. 
//
//Biggest takeaway: simple things break code and its not worth getting frusturated
//over. Also, learn as much as you can about your language (knowing about URL
//objects would have saved hours).
//

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const dns = require('dns');
const testURL = require('url');
var validUrl = require('valid-url');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});



//array (or our "database") is filled with dummy examples testing.
const urls = [{original_url: 'http://localhost:3000/', short_url: 1}, {original_url: 'https://www.google.com/', short_url: 2}, {original_url: 'www.yahoo.com', short_url: 3}, {original_url: 'ftp:/john-doe.invalidTLD', short_url: 4}];


app.post('/api/shorturl', function(req, res) {


let isItLegit = false;
let submittedURL = req.body.url;
try{
  submittedURL = new URL(req.body.url);
  isItLegit = true;
} catch(e) {
  console.log('Not Valid URL: ' + e);
  isItLegit = false;
}

if(!isItLegit){
  res.json({error: "invalid url"});
  console.log('Failed for not being a URL');
} else if((new URL(submittedURL).protocol != "http:") && (new URL(submittedURL).protocol != "https:")){
  res.json({error: "invalid url"});
  console.log('Failed for improper PROTOCOL format');
} else {
  urls.push({ original_url: req.body.url, short_url: urls.length + 1 })  

  console.log('POST')
  console.log(urls)

  res.json({ original_url: req.body.url, short_url: urls.length});
}
});


app.get('/api/shorturl/:url', function(req, res) {

  let arrayLocation = urls.findIndex((test) => {
    console.log(Number(test.short_url) === Number(req.params.url));
    return Number(test.short_url) === Number(req.params.url);
  })

  console.log('arraylocation: ' + arrayLocation);

  let targetDestination = 'http://localhost:3000/api/hello'
  if(arrayLocation != -1){
  targetDestination = urls[arrayLocation].original_url;
  console.log(targetDestination);
  res.redirect(targetDestination); 
  } else {
    res.json({error: 'short URL not in database'})
  }

});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});






//Exercise Tracker
//
//Purpose:
// Design an API that keeps records of users and logs of their exercise.
//
//It felt like I failed this test about 18 times when I knew my code was 
//working. The culprit: Timezones. Every date was 5 hours off because of
//time zone change. A lot of this code is filled with various unused ways
//of me trying to find ways to both identify and solve that problem. I 
//Also had a problem where I learned the word "break" is not the same 
//in every language. I needed to build my own break condition for the
//array loop.
//
//Overall, this was also a good learning ecperience. There were a lot
//of parts to this one. It was good to get an understanding of URL
//queries.

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


const users = [{username: 'Ryan', _id: '0'}];
const workouts = [{_id: '0',description: 'run', duration: '30', date: '11/22/2024'}]


app.post('/api/users', (req, res, next) =>{
  const username = req.body.username;

  users.push({username: username, _id: users.length.toString()});

  res.json({username: username, _id: users.length.toString()});
});


app.get('/api/users', (req, res, next) =>{


  res.json(users);
});


app.post('/api/users/:_id/exercises', (req, res, next) =>{
  
  console.log('')
  console.log('---New Exercise Posted---')
  console.log(`req.body: ${JSON.stringify(req.body)}`);
  console.log(`req.params: ${JSON.stringify(req.params)}`);
  console.log(`req.query: ${JSON.stringify(req.query)}`);



  console.log('req.params._id: ' + req.params._id)
  console.log('users[req.params._id]: ' + users[Number(req.params._id)])
  
  const usernameID = req.params._id;
  const username = users[req.params._id-1].username;

  let workoutDate = req.body.date;


  //check if date is valid
  
  try{
    workoutDate = new Date(req.body.date);
    //workoutDate = workoutDate.setHours(workoutDate.getHours() + 5)
  } catch(e) {
    console.log('Invalid Date Format');
    workoutDate = new Date();
  }
  if(!workoutDate || workoutDate == 0 || workoutDate == undefined || workoutDate == null || workoutDate == 'Invalid Date'){ workoutDate = new Date()};


  workoutDate = workoutDate.setHours(workoutDate.getHours() + 5)
  workoutDate = new Date(workoutDate).toUTCString();
  workoutDate = new Date(workoutDate).toDateString();
 

  const postedDate = new Date(req.body.date);


  console.log('wokrout Date: ' + workoutDate);
  //console.log('posted Date: ' + postedDate);
  console.log('posted Date(toString): ' + workoutDate.toString());
  //console.log('posted Date(toDateString): ' + workoutDate.toDateString());

  workouts.push({_id: usernameID, description: req.body.description, duration: Number(req.body.duration), date: req.body.date});

  //original - which doesnt work for some reason
  //res.json({_id: usernameID, username: username, description: req.body.description, duration: req.body.duration, date: postedDate.toDateString()});
  
  res.json({_id: usernameID, username: username, date: new Date(workoutDate).toDateString(), duration: Number(req.body.duration), description: req.body.description});
  console.log({_id: usernameID, username: username, date: new Date(workoutDate).toDateString(), duration: Number(req.body.duration), description: req.body.description})
});


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

  res.json({username: username, count: workoutCount, _id: req.params._id, log: workoutArray})
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})






//File Metadata Microservice
//
//Purpose:
// Design an API that displays uploaded file metadata.
//
//For being the last one of the API testing course, I figured this would be a lot harder.
//I think the real challenge was just to be given a new node package that we never
//used before and have to figure it out on our own. This is good practice because 
// I know for a fact this will happen in a real working environment.

var express = require('express');
var cors = require('cors');
require('dotenv').config()

var bodyParser = require('body-parser')
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) =>{
  let thisName = req.file.originalname

  let thisType = req.file.mimetype

  let thisSize = req.file.size

  console.log(thisName)
  console.log(thisType)
  console.log(thisSize)

  res.json({name: thisName, type: thisType, size: thisSize})
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
