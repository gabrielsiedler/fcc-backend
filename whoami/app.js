const express = require('express');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const homeMadeTemplateEngine = {
  run: (file, variables, cb) => {
    fs.readFile(path.join(__dirname, file), 'utf8', function (err, data) {
      if (err) throw err;

      Object.keys(variables).forEach(variable => {
        const regex = new RegExp('{{' + variable + '}}', 'g');
        data = data.replace(regex, variables[variable]);
      });

      return cb(data);
    });
  }
};

router.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const language = req.headers["accept-language"];
  const software = req.headers['user-agent'];

  homeMadeTemplateEngine.run('public/index.html', { ip, language, software }, data => {
    res.send(data);
  });
});

router.use(express.static(path.join(__dirname, '/public')));
router.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
router.use(express.static(path.join(__dirname, 'node_modules/font-awesome')));

module.exports = router;
