import { Router, Request, Response, NextFunction } from 'express';
import { userRoutes } from "../modules/user/userRoutes";
import { authorRoutes } from "../modules/author/authorRoutes";
import { bookRoutes } from "../modules/book/bookRoutes";
import { readRoutes } from "../modules/read/readRoutes";

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';

import { NotFoundError } from '../errors/custom-errors';


const router = Router();

const API_VERSION = '/api/v1';

router.use(`${API_VERSION}/users`, userRoutes);
router.use(`${API_VERSION}/authors`, authorRoutes);
router.use(`${API_VERSION}/books`, bookRoutes);
router.use(`${API_VERSION}/reads`, readRoutes);

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Reading Tracker API Documentation",
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

router.get('/api/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('*', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
});


export { router as apiRoutes };