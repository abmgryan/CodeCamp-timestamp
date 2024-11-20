// index.js
// where your node app starts

// init project
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
  myDate = req.params.date
  console.log('My date = ' + myDate);


  if(req.params.date){
    if(new Date(myDate).valueOf()){
      //use UTC form
      res.json({unix: new Date(myDate).valueOf(), utc: new Date(myDate).toUTCString()});
    } else if(Number(myDate)){
      //use UNIX form
      myDate = Number(myDate);
      
            res.json({unix: myDate, utc: new Date(myDate).toUTCString()});
    } else {
      //return error message
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
