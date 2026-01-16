require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const port = 3001

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // фронт
  credentials: true,               
}));
app.use(express.json())
app.use(cookieParser())

const authRoutes = require('./routes/auth')
const boardsRoutes = require('./routes/boards')
const columnsRoutes = require('./routes/columns')
const tasksRoutes = require('./routes/tasks')

app.use('/auth', authRoutes);
app.use('/boards', boardsRoutes);
app.use('/columns', columnsRoutes);
app.use('/tasks', tasksRoutes);


mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(async ()=>{
    app.listen(port,'0.0.0.0', ()=>{
      console.log(`Server has beeen started on port ${port}`)
    })
  })