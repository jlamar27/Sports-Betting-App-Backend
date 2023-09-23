import jwt from "jsonwebtoken"
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

export default async function verifyAuth(req, res, next) {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({
            status: 401,
            message: "You must signin first"
        });
    }

    const data = jwt.verify(token, SECRET_KEY);
    const currentTime = new Date();
    if(data.exp < currentTime.getTime()) {
        return res.status(401).json({
            status: 401,
            message: "Your token has expired. Please signin again"
        });
    } else {
        req.id = data.id;
        next();
    }
}