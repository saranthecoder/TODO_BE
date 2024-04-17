import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './src/router/user.routes.js';
import connectToMongoDB from './src/db/connectToMongoDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/user',router);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running in port ${PORT}`);
})
