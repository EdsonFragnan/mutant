'use strict';

const assert = require('assert');
const controller = require('../../controllers/mutant_post.js');
let mutant = [];
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const db = require('../../config/db.js');

describe('Test controller post DNA', (done) => {

  describe('Test controller POST DNA - Sucesso.', (done) => {

    before((done) => {
      db();
      done();
    });

    it('01 - Human', () => {
      const send = {
        'adn': [
          'ATGCGA',
          'CAGTGC',
          'TTATGT',
          'AGAAGG',
          'CACCTA',
          'TCACTG'
        ]
      };
      const resp = false;
      const res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: () => {
          return;
        }
      };
      controller.isMutant(send, res, () => {
        mutant.postMutant(resp, (err, data) => {
          assert.equal(res.sendStatus, 403);
          done();
        });
      });
    });

    it('02- Mutant', () => {
      const send = {
        'adn': [
          'ATGCGA',
          'CAGTGC',
          'TTATGT',
          'AGAAGG',
          'CCCCTA',
          'TCACTG'
        ]
      };
      const adn = true;
      let res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };
      controller.isMutant(send, res, () => {
        mutant.postMutant(adn, (err, data) => {
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

    it('01 - Err', () => {
      const send = {
        'adn':[
          'ATGCGA',
          'CAGTGC',
          'TTATGT',
          'AGAAGG',
          'CACCTA',
          'TCACTG'
        ]
      };
      const adn = false;
      const res = {
        sendStatus: (responseStatus) => {
          return responseStatus;
        },
        json: (responseMessage) => {
          return responseMessage;
        }
      };

      controller.isMutant(send, res, () => {
        mutant.postMutant(adn, (err) => {
          assert.equal(res.sendStatus, 503);
          done();
        });
      });
    });
  });

  
});