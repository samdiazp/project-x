import { getRedisUrl } from "@/app/utils/url";
import Redis, { RedisOptions } from "ioredis";

export class RedisClient {
  static client: Redis;

  static getClient() {
    if (!RedisClient.client) {
      const client = this.createRedisClient();
      if (!client) {
        throw new Error("Redis connection failed");
      }
      RedisClient.client = client;
    }

    return RedisClient.client;
  }

  private static createRedisClient() {
    try {
      const options: RedisOptions = {
        host: getRedisUrl(),
        lazyConnect: true,
        showFriendlyErrorStack: true,
        maxRetriesPerRequest: 0,
        enableAutoPipelining: true,
        retryStrategy: (times) => {
          if (times > 3) {
            throw new Error("Redis connection failed");
          }

          return Math.min(times * 100, 2000);
        },
      };
      const client = new Redis(options);

      client.on("error", (error) => {
        console.error("Redis error", error);
      });

      return client;
    } catch (error) {
      console.error("Redis error", error);
    }
  }
}
