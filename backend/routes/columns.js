const express = require('express')
const router = express.Router({ mergeParams: true });
const { addColumn, deleteColumn, updateColumn } = require('../controllers/columnController')
const mapColumn = require('../helpers/mapColumn')
const auth = require('../middleware/auth')

const tasksRoutes = require('./tasks');
router.use('/:columnId/tasks', tasksRoutes);

//columns
router.post('/', auth, async (req,res)=>{
  const { title } = req.body;
  const boardId = req.params.boardId;
  console.log(req.params.boardId)
  const userId = req.user.id;
const newColumn = await addColumn(userId, boardId, {title:req.body.title, order: req.body.order})
res.send({data: mapColumn(newColumn)})
})

router.patch('/:id', auth, async (req, res) => {
    const updatedColumn = await updateColumn(req.user.id, req.params.id, { 
      title: req.body.title,
      order: req.body.order
    });
    res.send({data: mapColumn(updatedColumn)})
  })


router.delete('/:id', auth, async (req,res)=>{
  await deleteColumn(req.user.id,req.params.id)
  res.send({error:null})
})


module.exports = router;