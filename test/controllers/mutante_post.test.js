'use strict';

const assert = require('assert');
const controller = require('../../controllers/mutante_post.js');
let mutante = [];
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const db = require('../../config/db.js');

describe('Test controller post DNA', (done) => {

  describe('Test controller POST DNA - Sucesso.', (done) => {

    before((done) => {
      db();
      done();
    });

    it('01 - Humano', () => {
      const envio = {
        'dna': [
          'ATGCGA',
          'CAGTGC',
          'TTATGT',
          'AGAAGG',
          'CACCTA',
          'TCACTG'
        ]
      };
      const isMutante = false;
      const res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: () => {
          return;
        }
      };
      controller.isMutante(envio, res, () => {
        mutante.postMutante(isMutante, (err, data) => {
          assert.equal(res.sendStatus, 403);
          done();
        });
      });
    });

    it('02- Mutante', () => {
      const envio = {
        'dna': [
          'ATGCGA',
          'CAGTGC',
          'TTATGT',
          'AGAAGG',
          'CCCCTA',
          'TCACTG'
        ]
      };
      const isMutante = true;
      const dna = true;
      let res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };
      controller.isMutante(envio, res, () => {
        mutante.postMutante(isMutante, (err, data) => {
          assert.equal(res.sendStatus, 200);
          done();
        });
      });
    });
  });

  describe('Test controller post DNA - ERRO.', (done) => {

    beforeEach((done) => {
      mongoose.connection.close();
      done();
    });

    it('01 - Erro', () => {
      const envio = {
        'dna':[
          'ATGCGA',
          'CAGTGC',
          'TTATGT',
          'AGAAGG',
          'CACCTA',
          'TCACTG'
        ]
      };
      const isMutante = false;
      const res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };
      const erro = {message: 'Erro ao cadastrar.'};

      controller.isMutante(envio, res, () => {
        mutante.postMutante(isMutante, (err) => {
          assert.equal(res.sendStatus, 503);
          done();
        });
      });
    });
  });

  
});