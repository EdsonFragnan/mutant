'use strict';

const mutant_model = require('../models/mutant.js');

module.exports.isMutant = (res) => {

    const treatsDivision = (mutant, human) => {
        if (mutant === 0 && human === 0) {
            return 0;
        } else if (mutant > 0 && human === 0) {
            return mutant;
        } else if (mutant === 0 && human > 0) {
            return human;
        }
        return (mutant/human).toFixed(2);
    };

    const treatsResponse = (data) => {
        let mutant = [];
        let human = [];
        data.forEach(row => {
            if (row.isMutant === true) {
                mutant.push(row.isMutant);
            } else {
                human.push(row.isMutant);
            }
        });
        let response = {
            ADN: {
                count_mutant_adn: mutant.length,
                count_human_adn: human.length,
                ratio: treatsDivision(mutant.length, human.length)
            }
        };
        return response;
    };

    const calledModel = () => {
        return new Promise((resolve, reject) => {
            mutant_model.getAll((err, data) => {
                if (err) {
                    reject();
                } else {
                    let resp = treatsResponse(data);  
                    resolve(resp);
                }
            });
        });
    }


    calledModel().then((result) => {
        res.json(result);
    }, (err) => {
        res.sendStatus(503);
    });    
};
