const express = require('express');
const moment = require('moment');
const path = require('path');

var router = express.Router();

router.use(express.static(path.join(__dirname, '/public')));
router.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
router.use(express.static(path.join(__dirname, 'node_modules/font-awesome')));

router.get('/:input', (req, res) => {
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

module.exports = router;
