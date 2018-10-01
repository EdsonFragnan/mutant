'use strict';
const mutant_model = require('../models/mutant.js');

module.exports.isMutant = (adn_human, res) => {

  const seq = {
    seq_a: 'AAAA',
    seq_c: 'CCCC',
    seq_g: 'GGGG',
    seq_t: 'TTTT'
  };

  const insertMutant = (adn, res) => {
    mutant_model.postMutant(adn, (err, data) => {
      if (err) {
        res.sendStatus(503);
      } else {
        if (adn === false) {
          res.sendStatus(403);
        } else {
          res.json();
        }
      }
    });
  };

  const checkArray = (adn) => {
    let mutant = false;
    adn.forEach(row => {
      let new_seq_a = new RegExp(this._seq.seq_a),
      new_seq_c = new RegExp(this._seq.seq_c),
      new_seq_g = new RegExp(this._seq.seq_g),
      new_seq_t = new RegExp(this._seq.seq_t);
      if (new_seq_a.test(row) === true ||
          new_seq_c.test(row) === true ||
          new_seq_g.test(row) === true ||
          new_seq_t.test(row) === true) {
            mutant = true;
          }  
    });
    return mutant;
  };

  const mountArray = (adn) => {
    const converted = adn.map((obj) => {
      return Object.keys(obj).map((key) => {
          return obj[key];
      });
    });
    return converted;
  };

  const mountResponse = (res) => {
    let final_array = [];
    this._mutant.filter(row => {
      if (row === true) {
        final_array.push(row);
      }
    });
    if(final_array.length >= 2) {
      insertMutant(true, res);
    } else {
      insertMutant(false, res);
    }
  };

  const mountDiagonalArray = (adn) => {
    let y_length = adn.length;
    let x_length = adn[0].length;
    let max_length = Math.max(x_length, y_length);
    let temp;
    let value = [];
    for (let k = 0; k <= 2 * (max_length - 1); ++k) {
        temp = [];
        for (let y = y_length - 1; y >= 0; --y) {
            let x = k - y;
            if (x >= 0 && x < x_length) {
                temp.push(adn[y][x]);
            }
        }
        if(temp.length > 0) {
          value.push(temp.join(''));
        }
    }
    return value;
  };

  const diagonalCheck = (res) => {
    let diagonal_value = mountDiagonalArray(this._adn);
    let final_diagonal_value = checkArray(diagonal_value);
    this._mutant.push(final_diagonal_value);
    mountResponse(res);
  };

  const invertArray = (array_value) => {

    const flipMatrix = matrix => (
      matrix[0].map((column, index) => (
        matrix.map(row => row[index])
      ))
    );
    return flipMatrix(array_value.reverse());
  };

  const verticalCheck = (res) => {
    let value_vertical = mountArray(this._adn);
    let reverse_array = invertArray(value_vertical);
    let new_array = [];
    reverse_array.forEach(row => {
      let item = row;
      item = item.join('');
      new_array.push(item);
    });
    let final_vertical_value = checkArray(new_array);
    this._mutant.push(final_vertical_value);
    diagonalCheck(res);
  };
  
  const horizontalCheck = (res) => {
    let value_horizontal = checkArray(this._adn);
    this._mutant.push(value_horizontal);
    verticalCheck(res);
  };

  this._adn = adn_human.adn;
  this._seq = seq;
  this._mutant = [];
  horizontalCheck(res);

};
