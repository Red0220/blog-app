import jwt from 'jsonwebtoken'
import { errorHandler} from './error.js'



export const verfyToken = (req, res,next) =>{
    const token = req.cookies.access_token ;

    console.log('Received Token:',token);
if(!token) {
    return next(errorHandler(401, 'Not authorized'));
}
jwt.verify(token, process.env.JWT_SECRET , (err,user)=>{
    if(err){
        return next(errorHandler(401,'Unauthorized'));
    }
    req.user = user;
    next();
});

}