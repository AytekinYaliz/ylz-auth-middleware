import { Request, Response, NextFunction } from "express";
import logger from "@ylz/logger";

import { decodeToken, verifyToken, IPayload } from "./encryption";

export default async function(req: Request, res: Response, next: NextFunction) {
  logger.debug("ylz-auth-middleware", req.headers["authorization"]);

  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.status(401).send({ message: "Missing authorization." });
  } else {
    const token = authorization.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ message: "Missing token." });
    }

    const isVerified = await verifyToken(token);
    if (!isVerified) {
      return res.status(401).send({ message: "Invalid token." });
    }

    const decodedToken: IPayload = await decodeToken(token);

    if (!decodedToken) {
      return res.status(401).send({ message: "Invalid token." });
    }

    if (decodedToken.ext < Date.now()) {
      return res.status(401).send({ message: "Token expired." });
    }

    res.locals.userId = decodedToken.uid;
    return next();
  }
}
