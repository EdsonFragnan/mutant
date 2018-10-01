'use strict';

module.exports = app => {
  const controller = app.controllers;
  const validation_entrance = require('../validation/validation.js');

  app.get('/stats', (req, res) => {
    controller.mutant_get.isMutant(res);
  });

  app.post('/mutant', (req, res) => {
    validation_entrance.validation(req.body, (err, result) => {
      if (err) {
        res.status(400).json({message: err.message});
      } else {
        controller.mutant_post.isMutant(result, res);
      }
    });
  });

  // Validation to route not found.
  app.get('*', function(req, res){
    res.status(404).json('Route not found!');
  });

  app.post('*', function(req, res){
    res.status(404).json('Route not found!');
  });

  app.delete('*', function(req, res){
    res.status(404).json('Route not found!');
  });

  app.put('*', function(req, res){
    res.status(404).json('Route not found!');
  });

  app.patch('*', function(req, res){
    res.status(404).json('Route not found!');
  });
}
