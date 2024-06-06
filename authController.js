const User = require("./models/User")
const Role = require("./models/Role")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {validationResult} = require('express-validator')
const { secret } = require("./config")

const generateAccessToken = (id, roles) => {
   const payload = {
      id,
      roles
   }
   return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
   async registration(req, res) {
      try{
         const errors = validationResult(req)
         if(!errors.isEmpty()) res.status(400).json({massage: "registration error", errors})

         const { username, password} = req.body

         const candidate = await User.findOne({username})
         if(candidate) res.status(400).json({massage: 'User with this name is exists'})
   
         

         const hashPassword = bcrypt.hashSync(password, 7);
         const userRole = await Role.findOne({value: "USER"})
         const user = new User({username, password: hashPassword, roles: [userRole.value]})
         await user.save()
         return res.json({massage: "User is successfully registered"})

      } catch (error) {
         console.log(error)
         res.status(400).json({massage: 'Registration error'})
      }
   }

   async login(req, res) {
      try{
         const { username, password } = req.body
         const user = await User.findOne({username})
         if(!user) {
            return res.status(400).json({massage: `User ${username} not found`})
         }
         const validPassword = bcrypt.compareSync(password, user.password)
         if(!validPassword) {
            return res.status(400).json({massage: `Password mismatch`})
         }

         const token = generateAccessToken(user._id, user.roles)
         return res.json({token})

      } catch (error) {
         console.log(error)
         res.status(400).json({massage: 'Login error'})
      }
   }

   async CotnectWS(req, res) {
      try{
         // const userRole = new Role()
         // const adminRole = new Role({value: "ADMIN"})
         // await userRole.save()
         // await adminRole.save()
         

         const users = await User.find()
         res.json(users)
      } catch (error) {
         console.log(error)
      }
   }
}

module.exports = new authController()