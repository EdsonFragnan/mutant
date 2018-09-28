'use strict';

const assert = require('assert');
const validation = require('../../validation/validation.js');

describe('Testes de validação.', (done) => {
  
  after(function () {
    process.exit(0);
  });

  const body = {
    "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CACCTA","TCACTG"]
  };

  const mensagemBody = 'Body de envio inválido!',
        mensagemDNA = 'Código DNA inválido!';

  it('Body inválido.', (done) => {
    const envio = null;
    validation.validation(envio, (err, data) => {
      assert.equal(err.mensagem, mensagemBody);
      done();
    });
  });

  it('DNA inválido.', (done) => {
    const envio = {
      "dna":["FFFFFF","CAGTGC","TTATGT","AGAAGG","CACCTA","TCACTG"]
    };
    validation.validation(envio, (err, data) => {
      assert.equal(err.mensagem, mensagemDNA);
      done();
    });
  });

  it('DNA Sucesso.', (done) => {
    const sucesso = {
      "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CACCTA","TCACTG"]
    };
    validation.validation(body, (err, result) => {
      assert.equal(result.length, sucesso.length);
      done();
    });
  });
});
  