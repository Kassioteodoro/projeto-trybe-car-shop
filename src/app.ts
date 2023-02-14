import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import CarRoutes from './Routes/CarRoute';
import MotorcycleRouter from './Routes/MotorcycleRoute';

const app = express();
app.use(express.json());
app.use(MotorcycleRouter);
app.use(CarRoutes);
app.use(ErrorHandler.handle);

export default app;
