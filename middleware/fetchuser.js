const jwt = require('jsonwebtoken')
// const jwt_sec = 'Psyblogtokenpw'

const fetchUser = (req,res,next)=>{
    //get the user from the auth token and add id to req object
    const authtoken = req.header('auth-token');
    if(!authtoken){
        res.status(401).send({error : "please authenticte using a valid token"})
     
    }
    try {
        const data = jwt.verify(authtoken , process.env.JWT_TOKEN);
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({error : "please authenticte using a valid token"})
    }
    
}

module.exports = fetchUser;