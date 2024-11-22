import dotenv from 'dotenv';
import { createClient, RedisClientType } from 'redis';

dotenv.config();

const client: RedisClientType = createClient({
    url: process.env.REDIS_URI,
});

interface RedisSetParams {
    key: string;
    value: number | Buffer;
}

class RedisService {
    constructor() {
        this.connect();
    }

    private async connect() {
        try {
            await client.connect();
            console.log('Connected to Redis');
        } catch (err) {
            console.error('Error connecting to Redis:', err);
        }
    }

    async REDIS_SET({ key, value }: RedisSetParams): Promise<string | null> {
        try {
            const reply = await client.set(key, value,{
                EX: 60*60
            });
            return reply;
        } catch (err) {
            throw new Error(`Redis set error: ${err}`);
        }
    }

    async REDIS_GET(key: string): Promise<number | null> {
        try {
            const reply = await client.get(key);
            return reply !== null ? parseFloat(reply) : null;
        } catch (err) {
            throw new Error(`Redis get error: ${err}`);
        }
    }

    async REDIS_LRANGE(key: string, start: number, end: number): Promise<string[]> {
        try {
            const reply = await client.lRange(key, start, end);
            return reply;
        } catch (err) {
            throw new Error(`Redis lrange error: ${err}`);
        }
    }
    async REDIS_INCR(key: string): Promise<number> {
        try {
            const reply = await client.incr(key);
            return reply;
        } catch (err) {
            throw new Error(`Redis incr error: ${err}`);
        }
    }
    async REDIS_DECR(key: string): Promise<number> {
        try {
            const reply = await client.decr(key);
            return reply;
        } catch (err) {
            throw new Error(`Redis decr error: ${err}`);
        }
    }
    async SET_NX(key: string, value: string | Buffer): Promise<number> {
        try {
            const result = await client.setNX(key, value);
            return result ? 1 : 0; // Redis setNX returns a boolean
        } catch (err) {
            throw new Error(`Redis setNX error: ${err}`);
        }
    }
    async REDIS_PUBLISH(channel: string, message: string): Promise<number> {
        try {
            const result = await client.publish(channel, message);
            return result;
        } catch (err) {
            throw new Error(`Redis publish error: ${err}`);
        }
    }
    async REDIS_SUBSCRIBE(channel: string): Promise<void> {
        try {
            await client.subscribe(channel, (message) => {
                console.log(`Received message from ${channel}: ${message}`);
            });
        } catch (err) {
            throw new Error(`Redis subscribe error: ${err}`);
        }
    }
    async disconnect() {
        try {
            await client.disconnect();
            console.log('Disconnected from Redis');
        } catch (err) {
            console.error('Error disconnecting from Redis:', err);
        }
    }
}

export default new RedisService();
