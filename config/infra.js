'use strict';

module.exports = app => {
  let port = process.env.PORT || 3000;
  const BodyParser = require('body-parser');
  app.use(BodyParser.json());
  app.listen(port, (porta) => {
    console.log('Mutant rodando na porta: ' + port);
  });
}
