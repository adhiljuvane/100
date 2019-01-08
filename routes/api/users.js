const express = require('express');
const router = express.Router();

//@route this is a GET request to api/users/test
//@desc Tests post route
//@acess public
router.get('/test',(req,res) => res.json({msg :"Users works"}));

module.exports = router;
