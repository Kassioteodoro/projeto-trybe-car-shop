import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const MotorcycleRouter = Router();

MotorcycleRouter.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).register(),
);
MotorcycleRouter.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).getAll(),
);
MotorcycleRouter.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getById(),
);
MotorcycleRouter.patch(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).update(),
);

export default MotorcycleRouter;