import express, { NextFunction, Request, Response, type Router } from 'express';
import morgan from 'morgan';
import serverless, { type Handler } from 'serverless-http';
import signale from 'signale';

import config from '../config';

/**
 * Creates a serverless Express application with the provided route and router.
 *
 * @param {string} route - The base route for the application.
 * @param {Router} router - The Express router to handle requests.
 * @returns {Handler} The serverless application.
 */
export default function serverlessApp(route: string, router: Router): Handler {
  const app = express();

  app.use(express.json());

  // Middleware to set headers for CORS and content type
  app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.env.HOST_SITE); // Allow requests from the host site
    res.setHeader('Content-Type', 'application/json'); // Set content type to JSON
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    next();
  });

  // XXX: Logging middleware - may need to be adjusted for production
  app.use(morgan('combined'));

  // Use the provided router for the specified route
  if (!route.startsWith('/')) {
    route = `/${route}`;
  }
  app.use(route, router);

  // Handle not found errors
  app.use((_, res, next) => {
    let err = new Error('Not Found');
    res.status(404);
    next(err);
  });

  // Handle fatal errors
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    signale.fatal(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  return serverless(app);
}
