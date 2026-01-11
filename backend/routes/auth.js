const express = require('express')
const{ register, login} = require('../controllers/userController')
const router = express.Router();
const mapUser = require('../helpers/mapUser')
const auth = require('../middleware/auth')


router.get('/', auth, (req, res) => {
  res.send({
    data: { user: mapUser(req.user)}
  });
});


router.post('/register', async (req,res)=>{
  console.log(req.body)
  try{
    const {user,token} = await register(req.body.login,req.body.password)
    res.cookie('token', token, {httpOnly:true})
      .send({error: null, user: mapUser(user)})
    
  } catch (e) {
    res.send({error: e.message || 'Unknown error'})
  }
})

router.post('/login', async (req,res)=>{
  
  try{
    
    const {user,token} = await login(req.body.login,req.body.password)

    res.cookie('token', token, {httpOnly:true})
      .send({error: null, user: mapUser(user)})
      
    
  } catch (e) {
    res.send({error: e.message || 'Unknown error'})
  }
})

router.post('/logout', async (req,res)=>{
  res
      .clearCookie('token', { httpOnly: true })
      .json({ data: true })
})

module.exports = router;