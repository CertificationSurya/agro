import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

mongoose.connect(process.env.MONGO_URI)
const mongoConnection = mongoose.connection;

mongoConnection.on('error', (error) => console.error('MongoDB connection error:', error));
mongoConnection.once('open', () => console.log('MongoDB connected successfully'));

export { mongoConnection };
