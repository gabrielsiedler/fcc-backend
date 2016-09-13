const express = require('express');
const moment = require('moment');

var app = express();

app.use(express.static('public/'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(express.static('node_modules/font-awesome'));

app.get('/:input', (req, res) => {
  const input = req.params.input;

  if (/^\d+$/.test(input)) {
    const unix = moment.unix(input);

    if (unix.isValid()) {
      return res.json({
        unix: input,
        natural: unix.startOf('day').format('MMMM D, YYYY'),
      });
    }
  } else {
    const natural = moment(input, 'MMMM D, YYYY');

    if (natural.isValid()) {
      return res.json({
        unix: natural.startOf('day').format('X'),
        natural: input,
      });
    }
  }

  res.json({ unix: null, natural: null });
});

app.listen(8080);
