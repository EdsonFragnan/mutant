'use strict';

const assert = require('assert');
const model = require('../../models/mutant.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const db = require('../../config/db.js');
let mutant = [];

describe('Test Model', (done) => {

  describe('Test - Return humans and mutants.', () => {

    it('Erro', () => {
      const errorMock = 'Error';
      model.getAll(() => {
        mutant.find((error) => {
          assert.equal(error, errorMock);
          done();
        });
      });
    });

    it('Success.', () => {
      const success = 'Success';
      model.getAll(() => {
        mutant.find((error, data) => {
          assert.equal(success, data);
          done();
        });
      });
    });
  });

  describe('Test - Save type of person in db.', () => {
    
    beforeEach((done) => {
      db();
      done();
    });

    it('Success.', () => {
      const success = 'Success';
      const isMutant = {isMutant: true};
      model.postMutant(() => {
        mutant.save(isMutant, (error, data) => {
          assert.equal(success, data);
          done();
        });
      });
    });
    
  });

  describe('Test - Save type of person in db.', () => {
    
    before((done) => {
      mongoose.connection.close();
      done();
    });

    it('Erro', () => {
      const errorMock = 'Error';
      const res = {
        status: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };
      const isMutant = {isMutant: true};
      model.postMutant(isMutant, res, () => {
        mutant.save(isMutant, (error, data) => {
          assert.equal(error, errorMock);
          done();
        });
      });
    });
  });

});
