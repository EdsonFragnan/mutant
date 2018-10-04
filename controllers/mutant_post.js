'use strict';
const mutant_model = require('../models/mutant.js');

module.exports.isMutant = (adn_human, res) => {

  const seq = {
    seq_a: 'AAAA',
    seq_c: 'CCCC',
    seq_g: 'GGGG',
    seq_t: 'TTTT'
  };

  const insertMutant = (_adn) => {
    return new Promise((resolve, reject) => {
      mutant_model.postMutant(_adn, (err, data) => {
        if (err) {
          reject({status: 503});
        } else {
          if (_adn === false) {
            reject({status: 403});
          } else {
            resolve();
          }
        }
      });
    }); 
  };

  const checkArray = (_adn, _seq) => {
    let mutant = false;
    _adn.forEach(row => {
      let new_seq_a = new RegExp(_seq.seq_a),
      new_seq_c = new RegExp(_seq.seq_c),
      new_seq_g = new RegExp(_seq.seq_g),
      new_seq_t = new RegExp(_seq.seq_t);
      if (new_seq_a.test(row) === true ||
          new_seq_c.test(row) === true ||
          new_seq_g.test(row) === true ||
          new_seq_t.test(row) === true) {
            mutant = true;
          }  
    });
    return mutant;
  };

  const mountArray = (_adn) => {
    const converted = _adn.map((obj) => {
      return Object.keys(obj).map((key) => {
          return obj[key];
      });
    });
    return converted;
  };

  const mountResponse = (_adns) => {
    return new Promise((resolve) => {
      let final_array = [];
      _adns.filter(row => {
        if (row === true) {
          final_array.push(row);
        }
      });
      if(final_array.length >= 2) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  };

  const mountDiagonalArray = (_adn) => {
    let y_length = _adn.length;
    let x_length = _adn[0].length;
    let max_length = Math.max(x_length, y_length);
    let temp;
    let value = [];
    for (let k = 0; k <= 2 * (max_length - 1); ++k) {
        temp = [];
        for (let y = y_length - 1; y >= 0; --y) {
            let x = k - y;
            if (x >= 0 && x < x_length) {
                temp.push(_adn[y][x]);
            }
        }
        if(temp.length > 0) {
          value.push(temp.join(''));
        }
    }
    return value;
  };

  const diagonalCheck = (_adn, _seq) => {
    return new Promise((resolve) => {
      let diagonal_value = mountDiagonalArray(_adn);
      let final_diagonal_value = checkArray(diagonal_value, _seq);
      resolve(final_diagonal_value);
    });
  };

  const invertArray = (array_value) => {

    const flipMatrix = matrix => (
      matrix[0].map((column, index) => (
        matrix.map(row => row[index])
      ))
    );
    return flipMatrix(array_value.reverse());
  };

  const verticalCheck = (_adn, _seq) => {
    return new Promise((resolve) => {
      let value_vertical = mountArray(_adn);
      let reverse_array = invertArray(value_vertical);
      let new_array = [];
      reverse_array.forEach(row => {
        let item = row;
        item = item.join('');
        new_array.push(item);
      });
      let final_vertical_value = checkArray(new_array, _seq);
      resolve(final_vertical_value);
    });
  };
  
  const horizontalCheck = (_adn, _seq) => {
    return new Promise((resolve) => {
      let value_horizontal = checkArray(_adn, _seq);
      resolve(value_horizontal);
    });
  };

  const promises = [
    horizontalCheck(adn_human.adn, seq), 
    verticalCheck(adn_human.adn, seq), 
    diagonalCheck(adn_human.adn, seq)
  ];

  Promise
    .all(promises)
    .then(result => {
      mountResponse(result)
        .then((data) => insertMutant(data))
        .then(response => {
          res.json();
        }, (err) => {
          res.sendStatus(err.status);
        });
    })
    .catch(error => {
      res.sendStatus(503);
    });
};
