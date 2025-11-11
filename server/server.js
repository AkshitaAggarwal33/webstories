
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import errorHandler from "./middleware/errorMiddleware.js";
import authRoutes from './routes/authRoutes.js'
import storiesRoutes from './routes/storiesRoutes.js'
import {connectCloudinary} from './config/cloudinary.js';

const app = express();
await connectDB();
connectCloudinary()


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Server is running'))
// app.use("/api/inngest", serve({ client: inngest, functions }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/stories", storiesRoutes);

app.use(errorHandler);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));