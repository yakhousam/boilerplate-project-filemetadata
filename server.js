'use strict';

const express = require('express');
const cors = require('cors');


// require and use "multer"...
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// const upload = multer({
//   dest: 'upload',
//   limits: {fileSize: 1024 * 1024 * 10}
// })

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
 if(req.file){
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
 }else{
   res.redirect('/')
 }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
