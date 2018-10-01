'use strict';

module.exports = () => {
  const mongoose = require('mongoose');
  mongoose.Promise = require('bluebird');

  let uristring = '',
    port = process.env.PORT || 3000;
    if (port === 3000) {
      uristring =
        process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://127.0.0.1:27017/mutant';
    } else {
      uristring =
        process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ||
        'mongodb://mutant:mutant123456@ds115533.mlab.com:15533/heroku_0r11shnh';
    }
  mongoose.connect(uristring, { useMongoClient: true }, (err, res) => {
    if (err) {
      console.log('Bad Connection: working in - ' + uristring + '. ' + err);
    } else {
      console.log('Connection Success: working in - ' + uristring);
    }
  });
};
