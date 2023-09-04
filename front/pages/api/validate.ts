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
  const json = await response.json();
  if (!response.ok)
    return res
      .status(400)
      .json({ error: "Validation failed", message: json });
  const client = RedisClient.getClient();
  if (!client)
    return res.status(503).json({ error: "Redis connection failed" });
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
