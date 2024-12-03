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
