import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors'


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
  app.options('*', cors());


mongoose.connect(process.env.MONGOOSE_URL)
.then(()=> console.log('connected ...'))
.catch(()=> console.log(error));

app.use('/server/user',userRoutes);
app.use('/server/auth',authRoutes);




app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500 ;
    const messsage = err.message || 'Internal Server Error ';
    res.status(statusCode).json({
        succcess : false ,
        statusCode,
        messsage
    });
});


app.listen(3000, ()=> console.log('listening ... !'))