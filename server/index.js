import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Allow cookies to be sent with the request
}));
app.options('*', cors());
app.use(cookieParser());





mongoose.connect(process.env.MONGOOSE_URL)
.then(()=> {
    console.log('connected ...')
})
.catch(()=>{
     console.log(error)
    });

app.use('/server/user',userRoutes);
app.use('/server/auth',authRoutes);
app.use('/server/post', postRoutes);
app.use('/server/comment', commentRoutes);




app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal Server Error ';
    res.status(statusCode).json({
        success : false ,
        statusCode,
        message,
    });
});


app.listen(3000, ()=> console.log('listening ... !'))