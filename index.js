const express = require('express');

var app = express();

app.use('/timestamp', require('./timestamp/app.js'));

app.listen(8080, function () {
  console.log('Server running on', 8080);
});
