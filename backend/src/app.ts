import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';

import { apiRoutes } from './routes';

import { globalErrorHandler } from './middlewares/error-handler';

dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRoutes);

app.use(globalErrorHandler);

export default app;