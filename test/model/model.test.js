'use strict';

const assert = require('assert');
const model = require('../../models/mutante.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const db = require('../../config/db.js');
let mutante = [];

describe('Test Model', (done) => {

  describe('Test - Retorna humanos e mutantes.', () => {

    it('Erro', () => {
      const errorMock = 'Error';
      model.getAll(() => {
        mutante.find((error) => {
          assert.equal(error, errorMock);
          done();
        });
      });
    });

    it('Sucesso.', () => {
      const sucesso = 'Sucesso';
      model.getAll(() => {
        mutante.find((error, data) => {
          assert.equal(sucesso, data);
          done();
        });
      });
    });
  });

  describe('Test - Salva tipo de pessoa no banco.', () => {
    
    beforeEach((done) => {
      db();
      done();
    });

    it('Sucesso.', () => {
      const sucesso = 'Sucesso';
      const isMutante = {isMutante: true};
      model.postMutante(() => {
        mutante.save(isMutante, (error, data) => {
          assert.equal(sucesso, data);
          done();
        });
      });
    });
    
  });

  describe('Test - Salva tipo de pessoa no banco.', () => {
    
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
      const isMutante = {isMutante: true};
      model.postMutante(isMutante, () => {
        mutante.save(isMutante, (error, data) => {
          assert.equal(error, errorMock);
          done();
        });
      });
    });
  });

});
