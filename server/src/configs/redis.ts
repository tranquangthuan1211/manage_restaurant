import dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URI
});

client.ping()
    .then((result: string) => {
        console.log(result);
    })
    .catch((err: any) => {
        console.error('Ping error:', err);
    });

client.on('connect', () => {
    console.log('Redis client connected with URI');
});

client.on('error', (error: Error) => {
    console.error('Redis client error:', error);
});

export default client;
