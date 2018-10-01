'use strict';

const assert = require('assert');
const validation = require('../../validation/validation.js');

describe('Validation test.', (done) => {
  
  after(function () {
    process.exit(0);
  });

  const body = {
    "adn":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CACCTA","TCACTG"]
  };

  const message_body = 'Invalid shipping body!',
        message_adn = 'Invalid adn code!';

  it('Invalid body.', (done) => {
    const send = null;
    validation.validation(send, (err, data) => {
      assert.equal(err.message, message_body);
      done();
    });
  });

  it('Invalid adn.', (done) => {
    const send = {
      "adn":["FFFFFF","CAGTGC","TTATGT","AGAAGG","CACCTA","TCACTG"]
    };
    validation.validation(send, (err, data) => {
      assert.equal(err.message, message_adn);
      done();
    });
  });

  it('ADN Success.', (done) => {
    const success = {
      "adn":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CACCTA","TCACTG"]
    };
    validation.validation(body, (err, result) => {
      assert.equal(result.length, success.length);
      done();
    });
  });
});
  