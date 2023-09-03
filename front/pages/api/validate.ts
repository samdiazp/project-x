import { getBackendUrl } from "@/app/utils/url";
import { RedisClient } from "@/storage/redis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${getBackendUrl()}/api/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });
  if (!response.ok) return res.status(500).json({ error: "Validation failed" });
  const client = RedisClient.getClient();
  if (!client)
    return res.status(500).json({ error: "Redis connection failed" });
  await client.connect();
  const json = await response.json();
  const key = `${req.body.jwt}:${JSON.stringify(json)}`;
  const exists = await client.lrange("jwt", 0, -1);
  if (exists.includes(key)) {
    client.disconnect();
    return res.status(200).json({ message: "OK", data: key });
  }
  await client.lpush("jwt", `${req.body.jwt}:${JSON.stringify(json)}`);
  return res
    .status(200)
    .json({ message: "OK", data: `${req.body.jwt}:${JSON.stringify(json)}` });
}
