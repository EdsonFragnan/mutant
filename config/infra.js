'use strict';

module.exports = app => {
  let port = process.env.PORT || 3000;
  const BodyParser = require('body-parser');
  app.use(BodyParser.json());
  app.listen(port, (new_port) => {
    console.log('Mutant working on port: ' + port);
  });
}
