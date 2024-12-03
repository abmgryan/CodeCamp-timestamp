//All Free-Code-Camp source code is added to this file
//These are all completed tests from: Back End Development and APIs Projects
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
//This one made me think a little bit. I kept receiving repeated errors no matter
//what I changed. After thoroughly debugging and logging my variables every time they changed,
//I realized it was a simple datatype error. Once I knew this and began using "new Number()" for
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
//I found this one to be straightforward.

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



//File Metadata Microservice
//
//For being the last one of the API testing course, I figured this would be a lot harder.
//I think the real challenge was just to be given a new node package that we never
//used before and have to figure it out on our own. This is a practice because 
// I know for a fact this will happen in a real working environment.

