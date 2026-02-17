
const jwt = require("jsonwebtoken")
async function identifier(req,res,next){
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"token not provided"
            })
        }
        let decoded = null
        try{
        decoded = jwt.verify(token,process.env.JWT_SECRET)
        }
        catch(err){
            return res.status(401).json({
                message:"user not authorize"
            })
        }
    
        req.user = decoded
        next();

}

module.exports = identifier;