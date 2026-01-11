const express = require('express')
const router = express.Router({ mergeParams: true });
const {addTask, deleteTask, updateTask, getAllTasks} = require('../controllers/taskController')
const mapBoard = require('../helpers/mapBoard')
const mapColumn = require('../helpers/mapColumn')
const mapTask = require('../helpers/mapTask')
const auth = require('../middleware/auth')




//tasks

router.get('/',  auth, async (req, res) => {
  try {
    const allTasks = await getAllTasks(req.user.id)
    res.send({
      data: allTasks.map(mapTask)
    });
  } catch (err) {
    console.error('GET /tasks error', err);
    res.status(500).send({ error: err.message });
  }
});

router.post('/', auth, async (req,res)=>{
  const { columnId } = req.params;
  const userId = req.user.id;
  const { title, order } = req.body;
  const newTask = await addTask(userId, columnId, {title, order})
  res.send({data: mapTask(newTask)})
})


router.patch('/:id', auth, async (req, res) => {
    const { title, order, columnId, completed } = req.body;
    const updatedTask = await updateTask(req.user.id, req.params.id, { 
      title,
      order,
      columnId, completed
    });
    
    res.send({data: mapTask(updatedTask)})
  })

router.delete('/:id', auth, async (req,res)=>{
  await deleteTask(req.params.id,req.user.id)
  res.send({error:null})
})

module.exports = router;
