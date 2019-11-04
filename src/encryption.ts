import fs = require("fs");
import jwt = require("jsonwebtoken");

export interface IPayload {
  ext: number;
  iat: number;
  uid: string;
}

const publicKey = fs.readFileSync("./public.pem", "utf8");

export async function decodeToken(token: string): Promise<IPayload> {
  const decodedToken = await jwt.decode(token, { complete: true });

  // @ts-ignore
  return decodedToken["payload"];
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwt.verify(token, publicKey);
  } catch (err) {
    console.error("Invalid token!!!", err["name"], err["message"]);
    return false;
  }

  return true;
}
