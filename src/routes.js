import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverylistController from './app/controllers/DeliverylistController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import AllProblemsController from './app/controllers/AllProblemsController';
import SelectDeliverymanController from './app/controllers/SelectDeliverymanController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/deliveryman/:id', SelectDeliverymanController.index);
routes.get('/deliveryman/:id/deliveries', DeliverylistController.index);
routes.put(
  '/deliveryman/:deliveryman/deliveries/:id',
  DeliverylistController.update
);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.get('/delivery/:id/problems', DeliveryProblemController.index);

routes.post('/sessions', SessionController.store);

routes.post('/files', upload.single('file'), FileController.store);

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/deliverymans', DeliverymanController.store);
routes.get('/deliverymans', DeliverymanController.index);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

routes.delete('/delivery/:id/problems', DeliveryProblemController.delete);

routes.get('/problems', AllProblemsController.index);

export default routes;
