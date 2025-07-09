import type { NextFunction, Response, Request } from 'express';
import z4 from 'zod/v4';

export function validateRequest(schema: z4.ZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body ?? {});
    if (!result.success) {
      res.status(400).json(z4.treeifyError(result.error));
    } else {
      req.body = result.data;
      next();
    }
  };
}
