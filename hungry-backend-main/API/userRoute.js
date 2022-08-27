const router = require('express').Router();
const user = require('../Model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const joi = require('joi');

const joiSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(11).max(11).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(8),
    vehicle: joi.string().required(),
    shift: joi.string().required()
})

const createToken = (id) => {
    const secret = process.env.SECRET;
    const payload = {id};
    const token = jwt.sign(payload, secret, {expiresIn: '1d'});
    return token;
}

// CREATE API TO REGISTER NEW USER 
router.post('/register', async (req, res) => {
    try{
        const data = req.body;
        const validate = joiSchema.validate(data);
        if(validate.error){
           res.status(422).json({success: false, message: validate.error.details[0].message})
        }else{
            const checkMail = await user.findOne({email: data.email});
            if(checkMail){
                res.status(422).json({success: false, message: 'Email is already exists'})
            }else{
                const newUser = new user(data);
                await newUser.save();
                res.status(201).json({success: true, message: "Successfully registered 🥳"})
            }
        }
    }catch(err){
        console.log(err)
    }
})

// CREATE API TO USER AUTHORIZATION
router.post('/authorize', async (req, res) => {
    try {
        const data = req.body;
        const getUser = await user.findOne({email: data.email});
        
        if(getUser){
            const checkPassword = await bcrypt.compare(data.password, getUser.password);
            if(checkPassword){
               const token= createToken(getUser._id);
                res.status(200).json({success: true, message: 'You are logged in', 'token': token});
            }else{
                res.status(422).json({success: false, message: 'Email or password is invalid'});
            }
        }else{
            res.status(504).json({success: false, message: 'Email or password is invalid'})
        }

    } catch (err) {
        console.log(err)
    }
})

// CREATE AN API TO CHECK THE LOGGED IN USERS 
router.get('/protected', async (req, res) =>{
    try{
      const token = req.headers.authorization.split(' ')[1];
      const validToken = jwt.verify(token, process.env.SECRET);
      if(validToken.id){
        const checkUser = await user.findById(validToken.id);
        if(checkUser){
          return res.status(200).json({message: 'User found', user: checkUser});
        }{
          res.status(404).json({message: 'Not valid user'})
        }
      }else{
         res.status(404).json({message: 'Not valid user'})
      }
    }catch(err){
      res.status(404).json({message: 'Not valid user'})
    }
})

// CREATE API TO CHANGE USER PASSWORD
router.post('/changepassword', async(req,res) => {
    try{
        const {old, created , id} = req.body;
        const validUser = await user.findById(id);
        if(validUser){
            const checkPassword = await bcrypt.compare(old, validUser.password);
            console.log(checkPassword)
            if(checkPassword){
                const hashedPassword = await bcrypt.hash(created, 10);
                await user.findByIdAndUpdate(id, {password: hashedPassword});
                res.status(200).json({success: true, message: 'Password changed!'})
            }else{
                res.status(422).json({
                    success: false,
                    message: "Password is incorrect!"
                })
            }
        }else{
            res.status(404).json({
                success: false,
                message: 'No user found' 
            })
        }

    }catch(err){
        console.log(err)
    }
})

// CREATE API TO CHANGE USER PASSWORD
router.put('/changeShift', async(req,res) => {
    try{
        const {shift, userId} = req.body;
        const findUser = await user.findByIdAndUpdate(userId, {shift});
        if(findUser){
            res.status(200).json({
                success: true, 
                message: 'Shift changed!'
            })
        }else{
            res.status(404).json({
                success: false,
                message: 'No user found' 
            })
        }

    }catch(err){
        console.log(err)
    }
})

module.exports = router;
