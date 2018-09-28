'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
let post_mutante = new Schema({
  isMutante: {
    type: Boolean,
    required: true,
  }
}),
mutante = mongoose.model('mutante', post_mutante);

module.exports = {

  getAll: (callback) => {
    mutante.find((error, data) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, data)
      }
    });
  },

  postMutante: (request, callback) => {
    let envio = {
      isMutante: request
    };
    let insert_mutante = new mutante(envio);
    insert_mutante.save(envio, (error, data) => {
      if (error) {
        callback(erro, null);
      } else {
        callback(null, data);
      }
    });
  }

}
