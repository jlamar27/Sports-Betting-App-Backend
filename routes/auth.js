import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js"
import verifyAuth from "../middlewares/verifyAuth.js"

const SECRET_KEY = process.env.SECRET_KEY;

function getExpiration(){
    const d = new Date();
    d.setMinutes(d.getMinutes() + 60);
    return d.getTime();
}

const router = Router();

router.get('/isValidToken', verifyAuth, async (req, res,) => {
    try {
        if(req.id){
            res.status(200).json({
                valid: true,
                status: 200,
                message: "Token is valid"
            });
        }
    } catch (error) {
        res.status(400).json({
            valid: false,
            status: 400,
            message: "Token is invalid",
            database_message: error.message
        });
    }
})

router.post('/signup', async (req, res) => {
  console.log(req.body);
    try {
        const { username, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        console.log(hash, username, password);
        const user = await User.create({
            username,
            hash,
            virtualMoney: 1000,
            bets: []
        });
        console.log(user);
        
        const data = {
            id: user._id,
            username: user.username,
            exp: getExpiration(),
        }
        console.log(data);

        const token = jwt.sign(data, SECRET_KEY);

        return res.status(200).json({
            status: 200,
            message: `Successfully created user: ${user.username}`
        });
    } catch (error) {
      console.log(error);
        res.status(400).json({
            status: 400,
            error: "Unable to Create User",
            database_message: error.message,
        });
    }
})

router.post('/signin', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      const hash = user.hash;
  
      const result = await bcrypt.compare(password, hash)

      if (!result) {
        throw new Error({message: 'Incorrect password', status: 401})
      }
  
      const data = {
        id: user._id,
        username: user.username,
        exp: getExpiration(),
      };
  
      // Create a token using JWToken 
      const token = jwt.sign(data, SECRET_KEY);

      console.log(user._id)
  
      // return the token
      return res.status(200).json({
        status: 200,
        message: `Successfully signed in ${user.username}`,
        user: user._id,
        token: token
      })
    } catch (error) {
      if (error.status === 401) {
        res.status(401).json({
          error: error.message
        });
      }
        res.status(404).json({
          status: 404,
          error: `User not found`,
          database_message: error.message,
        });
    }
})

export default router;