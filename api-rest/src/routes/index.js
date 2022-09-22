const express = require('express');
const heroesController = require('../controller/heroesController');

const heroesRouter = express.Router();

heroesRouter
  .post('/heroes', heroesController.create)
  .get('/heroes', heroesController.getAll)
  .get('/heroes/:id', heroesController.getById)
  .patch('/heroes/:id', heroesController.update)
  .delete('/heroes/:id', heroesController.delete);

module.exports = { heroesRouter };
