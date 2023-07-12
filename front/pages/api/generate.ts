import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body) as {jwt: string}
  const token = sign(body.jwt, process.env.JWT_SECRET!)
  return res.status(200).json({token: token})
}
