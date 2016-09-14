const express = require('express');
const app = express();

app.use('/timestamp', require('./timestamp/app.js'));
app.use('/whoami', require('./whoami/app.js'));

app.listen(8080, function () {
  console.log('Server running on', 8080);
});
