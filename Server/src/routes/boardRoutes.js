const express = require('express');
const router = express.Router();
const boardController = require('./../controllers/boardController')

router.get('/boards', boardController.getBoards);
router.post('/boards/add', boardController.addBoard);
router.put('/boards/:id', boardController.updateBoard);
router.put('/boards/:id/clear', boardController.clearBoard);

module.exports = router;