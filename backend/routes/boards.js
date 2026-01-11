const express = require('express')
const router = express.Router();
const {createBoard, updateBoard, getBoard, getBoards, deleteBoard} = require('../controllers/boardController')
const mapBoard = require('../helpers/mapBoard')
const mapColumn = require('../helpers/mapColumn')
const mapTask = require('../helpers/mapTask')
const auth = require('../middleware/auth')

const columnsRoutes = require('./columns');

// Вложенный роут колонок
router.use('/:boardId/columns', columnsRoutes);


//create board
router.post('/', auth, async (req,res)=>{

  const { title } = req.body;
    if (!title) throw new Error('Title is required');
    const newBoard = await createBoard( req.user.id, {title  })
  res.send({data: mapBoard(newBoard)})
})

//get all boards
router.get('/', auth, async (req,res)=>{

  const boards = await getBoards(req.user.id, req.query.search)
  res.send({data: {boards: boards.map(mapBoard)}})
})

//get one board
router.get('/:id', auth,  async (req,res)=>{
  const{ board, columns, tasks }= await getBoard(req.params.id)
  const boardId = req.params.id;
  if(!boardId) return res.status(400).json({ error: 'Board ID is required' });
  if(board.userId.toString() !== req.user.id) {
    throw new Error('Access denied')
  }
  res.send({data:{board: mapBoard(board), columns: columns.map(mapColumn), tasks: tasks.map(mapTask) }})
})

// update board
router.patch('/:id', auth, async (req,res)=>{
  const updatedBoard = await updateBoard(req.user.id, req.params.id,{title: req.body.title})

  res.send({data: mapBoard(updatedBoard)})
})

// delete board
router.delete('/:id', auth, async (req,res)=>{
  await deleteBoard(req.user.id,req.params.id)
  res.send({error:null})
})

module.exports = router;