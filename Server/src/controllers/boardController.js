const Board = require('./../models/board');

//Get all boards
exports.getBoards = async (req, res) => {
    try {
        const boards = await Board.find();
        res.status(200).send(boards);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//Add new board
exports.addBoard = async (req, res) => {
    try {
        const newBoard = new Board(req.body);
        await newBoard.save();
        res.status(201).send(newBoard);
    } catch (err) {
        res.status(400).send(err.message);
    }
};
//Update board by ID
exports.updateBoard = async (req, res) => {
    try {
        await Board.updateOne(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        const updatedBoard = await Board.findById(req.params.id);
        console.log(updatedBoard);
        res.status(200).send(updatedBoard);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

//Clear board 
exports.clearBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);
        board.columns = [];
        await board.save();
        res.status(200).send(board)
    } catch(err) {
        res.status(500).send(err.message);
    }
}