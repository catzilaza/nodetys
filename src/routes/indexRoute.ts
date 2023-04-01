import { Router } from 'express';
import { indexController } from '../controllers/indexController';
import { getDessertAll } from '../controllers/dessertController';

export const indexRouter = Router();

indexRouter.get('/', indexController);
//indexRouter.get('/', getDessertAll);