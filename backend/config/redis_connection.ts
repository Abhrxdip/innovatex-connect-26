import {
    createClient
} from "redis"

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

//? because global has no relation with redisClient we first typecast as unknown
//? global variable 
const globalForRedis = global as unknown as {
    redisClient: ReturnType<typeof createClient>
}

export const redisClient = globalForRedis.redisClient || createClient({
    url: redisUrl,
    socket: {
        connectTimeout: 5000,
        keepAlive: true,
        keepAliveInitialDelay: 5000,
    }
})

if (process.env.NODE_ENV !== 'production') {
    globalForRedis.redisClient = redisClient;
}

export default async function RedisInstance() {
    if (!redisClient.isOpen) {
        await redisClient.connect()
    }
    return redisClient
}

