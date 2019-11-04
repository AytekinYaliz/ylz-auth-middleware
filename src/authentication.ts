import { Request, Response, NextFunction } from "express";
import logger from "@ylz/logger";

import { decodeToken, verifyToken, IPayload } from "./encryption";

export default async function(req: Request, res: Response, next: NextFunction) {
  logger.debug("ylz-auth-middleware", req.headers["authorization"]);

  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.status(401).json({ message: "Missing authorization." });
  }
  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Missing token." });
  }

  if (!verifyToken(token)) {
    return res.status(401).json({ message: "Invalid token." });
  }

  const decodedToken: IPayload = await decodeToken(token);

  if (!decodeToken) {
    return res.status(401).json({ message: "Invalid token." });
  }

  if (decodedToken.ext < Date.now()) {
    return res.status(401).json({ message: "Token expired." });
  } else {
    res.locals.userId = decodedToken.uid;

    next();
  }
}
