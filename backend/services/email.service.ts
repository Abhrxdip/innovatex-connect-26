import {
  createClient
} from "redis"

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

//? because global has no relation with redisClient we first typecast as unknown
//? global variable 
const globalForRedis = global as unknown as {
  redisClient: ReturnType<typeof createClient>
}

const redisClient = globalForRedis.redisClient || createClient({ url: redisUrl })

