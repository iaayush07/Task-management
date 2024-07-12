const Board = require('./../models/board');

const boardController = async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);  
      } catch (err) {
        console.log(err);
      }
}
module.exports = boardController;