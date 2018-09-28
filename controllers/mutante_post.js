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

  const verificaArray = (dna, seq) => {
    let mutante = false;
    for(let i in dna) {
      let _dna = dna[i],
      new_seq_a = new RegExp(seq.seq_a),
      new_seq_c = new RegExp(seq.seq_c),
      new_seq_g = new RegExp(seq.seq_g),
      new_seq_t = new RegExp(seq.seq_t);
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

  const montarResposta = (mutante, res) => {
    let arrayFinal = [];
    for (let i in mutante) {
      if (mutante[i] === true) {
        arrayFinal.push(mutante);
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

  const verificaDiagonal = (dna, seq, mutante, res) => {
    let valDiagonal = montarArrayDiagonal(dna);
    let valDiagonalFinal = verificaArray(valDiagonal, seq);
    mutante.push(valDiagonalFinal);
    montarResposta(mutante, res);
  };

  const invertArray = (arrayValor) => {

    const flipMatrix = matrix => (
      matrix[0].map((column, index) => (
        matrix.map(row => row[index])
      ))
    );
    
    return flipMatrix(arrayValor.reverse());

  };

  const verificaVertical = (dna, seq, mutante, res) => {
    let valVertical = montarMatriz(dna);
    let inverte = invertArray(valVertical);
    let newArray = [];
    for (let i in inverte) {
      let item = inverte[i];
      item = item.join('');
      newArray.push(item);
    }
    let valVerticalFinal = verificaArray(newArray, seq);
    mutante.push(valVerticalFinal);
    verificaDiagonal(dna, seq, mutante, res);
  };
  
  const verificaHorizontal = (dna, seq, res) => {
    let mutante = [];
    let valHorizontal = verificaArray(dna, seq);
    mutante.push(valHorizontal);
    verificaVertical(dna, seq, mutante, res);
  };
  verificaHorizontal(dna_humano.dna, seq, res);

};
