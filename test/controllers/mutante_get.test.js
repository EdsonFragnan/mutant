'use strict';

const assert = require('assert');
const controller = require('../../controllers/mutante_get.js');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const db = require('../../config/db.js');
let mutante_model = [];

describe('Test controller get People.', (done) => {

  describe('Test controller get People - Sucesso.', (done) => {

    before((done) => {
      db();
      done();
    });

    it('Sucesso', () => {
      const res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };

      controller.isMutante(res, () => {
        mutante_model.getAll();
        done();
      });
    });
  });

  describe('Test controller get People - ERRO.', (done) => {

    after((done) => {
      mongoose.connection.close();
      done();
    });

    it('Erro', () => {
      const res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };
      const erro = 'ERRO';
      controller.isMutante(res, () => {
        mutante_model.getAll(erro, (err, data) => {
          done();
        });
      });
    });
  });
});
