const express = require('express');
const router = express.Router();

//@route this is a GET request to api/posts/test
//@desc Tests post route
//@acess public
router.get('/test',(req,res)=> res.json({msg :"Posts works"}));

module.exports = router;
