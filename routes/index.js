'use strict';

module.exports = app => {
  const controller = app.controllers;
  const validation_entrance = require('../validation/validation.js');

  app.get('/stats', (req, res) => {
    controller.mutante_get.isMutante(res);
  });

  app.post('/mutant', (req, res) => {
    validation_entrance.validation(req.body, (err, entrada) => {
      if (err) {
        res.status(400).json({mensagem: err.mensagem});
      } else {
        controller.mutante_post.isMutante(entrada, res);
      }
    });
  });

  // Validation to route not found.
  app.get('*', function(req, res){
    res.status(404).json('Rota não encontrada!');
  });

  app.post('*', function(req, res){
    res.status(404).json('Rota não encontrada!');
  });

  app.delete('*', function(req, res){
    res.status(404).json('Rota não encontrada!');
  });

  app.put('*', function(req, res){
    res.status(404).json('Rota não encontrada!');
  });

  app.patch('*', function(req, res){
    res.status(404).json('Rota não encontrada!');
  });
}
