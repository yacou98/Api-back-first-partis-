const {expressJwt}= require('express-jwt')
const secret= process.env.secret;

function authJwt() {
  
    return expressJwt({
        secret: process.env.secret,
        algorithms:['HS256']
    })
}


module.exports=authJwt;
