import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGOOSE_URL)
.then(()=> console.log('connected ...'))
.catch(()=> console.log(error));

app.use('/server/user',userRoutes)


app.listen(3000, ()=> console.log('listening ... !'))