'use strict';

module.exports.validation = (body, callback) => {

    const validation_body = (body) => {
        return new Promise((resolve, reject) => {
            if (!body || !body.adn) {
                reject({message: 'Invalid shipping body!'});
            } else {
                let adn = body.adn;
                let object = [];
                let error_mount = false;
                adn.forEach(row => {
                    let letter = row;
                    for(let k in letter) {
                        if(
                            letter[k].toUpperCase() != 'A' &&
                            letter[k].toUpperCase() != 'C' &&
                            letter[k].toUpperCase() != 'G' &&
                            letter[k].toUpperCase() != 'T'
                        ) {
                            error_mount = true;
                        }
                    } 
                });
        
                if(error_mount === true) {
                    reject({message:'Invalid adn code!'});
                } else {
                    adn.forEach(newRow => {
                        object.push(newRow.toUpperCase());
                    });
                    let result = {
                        adn: object
                    };
                    resolve(result); 
                }
            }
        });
    };

    validation_body(body).then((result) => {
        callback(null, result);
    }, (err) => {
        callback(err, null);
    });

};
