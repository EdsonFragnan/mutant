'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
let post_mutant = new Schema({
  isMutant: {
    type: Boolean,
    required: true,
  }
}),
mutant = mongoose.model('mutant', post_mutant);

module.exports = {

  getAll: (callback) => {
    mutant.find((error, data) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, data)
      }
    });
  },

  postMutant: (request, callback) => {
    let send = {
      isMutant: request
    };
    let insert_mutant = new mutant(send);
    insert_mutant.save(send, (error, data) => {
      if (error) {
        callback(erro, null);
      } else {
        callback(null, data);
      }
    });
  }

}
