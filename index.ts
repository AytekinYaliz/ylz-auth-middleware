import { Request, Response, NextFunction } from "express";
import logger from "@ylz/logger";

export default function(req: Request, res: Response, next: NextFunction) {
  logger.debug("ylz-auth-middleware");
  next();
}
