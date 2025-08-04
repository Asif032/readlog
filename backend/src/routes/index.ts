import { Router, Request, Response, NextFunction } from 'express';
import { userRoutes } from "../modules/user/routes";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../config/swagger';


const router = Router();

const API_VERSION = '/api/v1';

router.use(`${API_VERSION}/users`, userRoutes);

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Swagger documentation
router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Reading Tracker API Documentation",
  swaggerOptions: {
    persistAuthorization: true,
  },
}));

// Swagger JSON endpoint
router.get('/api/docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// 404 handler
router.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
  });
});

// Error handler
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
  });
});

export { router as apiRoutes };