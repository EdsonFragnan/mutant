'use strict';

const assert = require('assert');
const controller = require('../../controllers/mutant_get.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const db = require('../../config/db.js');
const model = require('../../models/mutant.js');
let mutant_model = [];

describe('Test controller get People.', (done) => {

  describe('Test controller get People - Success.', (done) => {

    before((done) => {
      db();
      done();
    });

    it('Success', () => {
      const res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };

      controller.isMutant(res, () => {
        mutant_model.getAll();
        done();
      });
    });
  });

  describe('Test controller get People - Clean one Collection.', (done) => {

    before((done) => {
      for (var collection in mongoose.connection.collections) {
        console.log(collection);
        mongoose.connection.collections[collection].remove(function() {
          let send = {
            isMutant: false
          };
          model.postMutant(send, (err, data) => {})
        });
      }  
      done();    
    });

    it('Clean one Collection', () => {
      const res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };

      controller.isMutant(res, () => {
        mutant_model.getAll();
        done();
      });
    });
  });

  describe('Test controller get People - Clean DB.', (done) => {

    before((done) => {
      for (var collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].remove(function() {});
      }  
      done();
    });

    it('Clean DB', () => {
      const res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };

      controller.isMutant(res, () => {
        mutant_model.getAll();
        done();
      });
    });
  });

  describe('Test controller get People - ERR.', (done) => {

    after((done) => {
      mongoose.connection.close();
      done();
    });

    it('ERR', () => {
      const res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };
      const erro = 'ERR';
      controller.isMutant(res, () => {
        mutant_model.getAll(erro, (err, data) => {
          done();
        });
      });
    });
  });
});
