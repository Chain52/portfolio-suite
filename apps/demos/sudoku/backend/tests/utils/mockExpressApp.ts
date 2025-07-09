import express, { type Router } from 'express';

export const mockExpressApp = (route: string, router: Router) => {
  const app = express();
  app.use(route, router);
  return app;
};
