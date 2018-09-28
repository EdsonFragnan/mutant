'use strict';

module.exports.isMutante = (res) => {
    const mutante_model = require('../models/mutante.js');

    const trataDivisao = (mutant, human) => {
        return (mutant/human).toFixed(2);
    };

    const trataResposta = (data) => {
        let mutant = [];
        let human = [];
        for (let i in data) {
            if (data[i].isMutante === true) {
                mutant.push(data[i].isMutante);
            } else {
                human.push(data[i].isMutante);
            }
        }
        let response = {
            ADN: {
                count_mutant_dna: mutant.length,
                count_human_dna: human.length,
                ratio: trataDivisao(mutant.length, human.length)
            }
        };
        return response;
    };

    const chamadaModel = (res) => {
        mutante_model.getAll((err, data) => {
            if (err) {
                res.sendStatus(503);
            } else {
                let resp = trataResposta(data);  
                res.json(resp);
            }
        });
    }

    chamadaModel(res);
    
};
