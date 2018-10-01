'use strict';

module.exports.validation = (body, callback) => {
    if (!body || !body.adn) {
        callback({message: 'Invalid shipping body!'}, null);
    } else {
        let adn = body.adn;
        let object = [];
        let error_mount = false;
        for(let i in adn) {
            let letter = adn[i];
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
        }
        for(let k in adn) {
            object.push(adn[k].toUpperCase());
        }
        if(error_mount === true) {
            callback({message:'Invalid adn code!'}, null);
        } else {
            let result = {
                adn: object
            };
            callback(null, result); 
        }
    }
};
