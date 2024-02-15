import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGOOSE_URL)
.then(()=> console.log('connected ...'))
.catch(()=> console.log(error));


app.listen(3000, ()=> console.log('listening ... !'))