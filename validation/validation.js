'use strict';

module.exports.validation = (body, callback) => {
    if (!body || !body.dna) {
        callback({mensagem: 'Body de envio inválido!'}, null);
    } else {
        let dna = body.dna;
        let objeto = [];
        let montaErro = false;
        for(let i in dna) {
            let letra = dna[i];
            for(let k in letra) {
                if(
                    letra[k].toUpperCase() != 'A' &&
                    letra[k].toUpperCase() != 'C' &&
                    letra[k].toUpperCase() != 'G' &&
                    letra[k].toUpperCase() != 'T'
                ) {
                    montaErro = true;
                }
            } 
        }
        for(let k in dna) {
            objeto.push(dna[k].toUpperCase());
        }
        if(montaErro === true) {
            callback({mensagem:'Código DNA inválido!'}, null);
        } else {
            let result = {
                dna: objeto
            };
            callback(null, result); 
        }
    }
};
