const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

//Load User Model
const User = require('../../models/User');

//@route this is a GET request to api/users/test
//@desc Tests post route
//@acess public
router.get('/test',(req,res) => res.json({msg :"Users works"}));

//@route this is a GET request to api/users/register
//@desc Register User
//@acess public
router.post('/register', (req , res) => {
    User.findOne({ email : req.body.email })
        .then(user => {
            if(user){
                return res.status(400).json({email : "Email already Exists"})
            } else {
                const avatar = gravatar.url(req.body.email , {
                    s : '200' , //Size
                    r : 'pg' ,  //Rating
                    d : 'mm' ,  //Default
                });

                const newUser = new User({
                    name : req.body.name,
                    email : req.body.email,
                    avatar,
                    password : req.body.password ,
                });
                bcrypt.genSalt(10 , (err,salt) => {
                    bcrypt.hash(newUser.password , salt , (err,hash) => {
                        if (err) throw err ;
                        newUser.password = hash;
                         newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

//@route this is a GET request to api/users/login
//@desc User Login / Return JWT Token
//@acess public
router.post('/login' , (req , res) => {
    const email = req.body.email
    const password = req.body.password

    //Find User by email
    User.findOne({ email : email}).then( user => {
        //check for user
        if(!user){
            return res.status(404).json({ email : 'User not found'});
        }

        //check password
        bcrypt.compare(password , user.password).then(isMatch => {
            if(isMatch){
                res.json({msg : "Success"})
            }else{
                return res.status(400).json({password : "incorrect password"});
            }
        })
    })
})


module.exports = router;
