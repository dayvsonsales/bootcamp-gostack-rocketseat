import { Router } from 'express';

import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import StartDeliveryController from './app/controllers/StartDeliveryController';
import OpenedDeliveryController from './app/controllers/OpenedDeliveryController';
import EndedDeliveryController from './app/controllers/EndedDeliveryController';
import EndDeliveryController from './app/controllers/EndDeliveryController';
import ProblemController from './app/controllers/ProblemController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import CancelDeliveryController from './app/controllers/CancelDeliveryController';
import FileController from './app/controllers/FileController';

import multerConfig from './config/multer';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.post('/delivery/:id/start', StartDeliveryController.store);
routes.post('/delivery/:id/finish', EndDeliveryController.store);

routes.get('/deliveryman/:id/deliveries', OpenedDeliveryController.index);
routes.get('/deliveryman/:id/deliveries/ended', EndedDeliveryController.index);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

routes.get('/delivery-problems', DeliveryProblemController.index);

routes.get('/delivery/:id/problems', ProblemController.index);
routes.post('/delivery/:id/problems', ProblemController.store);
routes.delete('/problem/:id/cancel-delivery', CancelDeliveryController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
