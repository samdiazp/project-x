import { RedisClient } from "@/storage/redis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = RedisClient.getClient();
  if (!client) {
    return res.status(500).json({ error: "Redis client not found" });
  }
  const registers = await client.lrange("jwt", 0, -1);
  return res.status(200).json(registers);
}
