import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db';
import corsOptions from './middlewares/enableCors';
import errorHandler from './middlewares/errorHandler';
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';
const cors = require('cors');

//Configure dotenv and connect Database;
dotenv.config();
connectDB();

const app = express();

app.use(express.json());

//CORS Configuration
app.use(cors(corsOptions));

//Apis
app.use('/api', eventRoutes);
app.use('/api', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
