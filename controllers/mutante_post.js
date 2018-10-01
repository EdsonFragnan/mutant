'use strict';

module.exports.isMutante = (dna_humano, res) => {
  const mutante_model = require('../models/mutante.js');

  const seq = {
    seq_a: 'AAAA',
    seq_c: 'CCCC',
    seq_g: 'GGGG',
    seq_t: 'TTTT'
  };

  const insert_mutante = (dna, res) => {
    mutante_model.postMutante(dna, (err, data) => {
      if (err) {
        res.sendStatus(503);
      } else {
        if (dna === false) {
          res.sendStatus(403);
        } else {
          res.json();
        }
      }
    });
  };

  const verificaArray = (dna) => {
    let mutante = false;
    for(let i in dna) {
      let _dna = dna[i],
      new_seq_a = new RegExp(this._seq.seq_a),
      new_seq_c = new RegExp(this._seq.seq_c),
      new_seq_g = new RegExp(this._seq.seq_g),
      new_seq_t = new RegExp(this._seq.seq_t);
      if (new_seq_a.test(_dna) === true ||
          new_seq_c.test(_dna) === true ||
          new_seq_g.test(_dna) === true ||
          new_seq_t.test(_dna) === true) {
            mutante = true;
          }     
    }
    return mutante;
  };

  const montarMatriz = (dna) => {
    const convertida = dna.map(function(obj) {
      return Object.keys(obj).map(function(chave) {
          return obj[chave];
      });
    });
    return convertida;
  };

  const montarResposta = (res) => {
    let arrayFinal = [];
    for (let i in this._mutante) {
      if (this._mutante[i] === true) {
        arrayFinal.push(this._mutante);
      }
    }
    if(arrayFinal.length >= 2) {
      insert_mutante(true, res);
    } else {
      insert_mutante(false, res);
    }
  };

  const montarArrayDiagonal = (dna) => {
    let Ylength = dna.length;
    let Xlength = dna[0].length;
    let maxLength = Math.max(Xlength, Ylength);
    let temp;
    let valor = [];
    for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
        temp = [];
        for (let y = Ylength - 1; y >= 0; --y) {
            let x = k - y;
            if (x >= 0 && x < Xlength) {
                temp.push(dna[y][x]);
            }
        }
        if(temp.length > 0) {
            valor.push(temp.join(''));
        }
    }
    return valor;
  };

  const verificaDiagonal = (res) => {
    let valDiagonal = montarArrayDiagonal(this._dna);
    let valDiagonalFinal = verificaArray(valDiagonal);
    this._mutante.push(valDiagonalFinal);
    montarResposta(res);
  };

  const invertArray = (arrayValor) => {

    const flipMatrix = matrix => (
      matrix[0].map((column, index) => (
        matrix.map(row => row[index])
      ))
    );
    return flipMatrix(arrayValor.reverse());
  };

  const verificaVertical = (res) => {
    let valVertical = montarMatriz(this._dna);
    let inverte = invertArray(valVertical);
    let newArray = [];
    for (let i in inverte) {
      let item = inverte[i];
      item = item.join('');
      newArray.push(item);
    }
    let valVerticalFinal = verificaArray(newArray);
    this._mutante.push(valVerticalFinal);
    verificaDiagonal(res);
  };
  
  const verificaHorizontal = (res) => {
    let valHorizontal = verificaArray(this._dna);
    this._mutante.push(valHorizontal);
    verificaVertical(res);
  };

  this._dna = dna_humano.dna;
  this._seq = seq;
  this._mutante = [];
  verificaHorizontal(res);

};
