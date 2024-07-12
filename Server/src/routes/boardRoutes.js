const express = require('express');
const Router = express.Router();
const boardController = require('./../controllers/boardController')

Router.get('/api/boards', boardController);

module.exports = Router;