'use strict';

module.exports.isMutant = (res) => {
    const mutant_model = require('../models/mutant.js');

    const treatsDivision = (mutant, human) => {
        if (mutant === 0 && human === 0) {
            return 0;
        } else if (mutant > 0 && human === 0 || mutant === 0 && human > 0) {
            return 0;
        }
        return (mutant/human).toFixed(2);
    };

    const treatsResponse = (data) => {
        let mutant = [];
        let human = [];
        data.map(row => {
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

    const calledModel = (res) => {
        mutant_model.getAll((err, data) => {
            if (err) {
                res.sendStatus(503);
            } else {
                let resp = treatsResponse(data);  
                res.json(resp);
            }
        });
    }

    calledModel(res);    
};
