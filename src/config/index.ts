import { config } from 'dotenv';
import { UserModel } from '../models/users.model';
import { ConnectionOptions } from 'typeorm';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const dbConfig: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [UserModel],
    synchronize: true,
};

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;

export { dbConfig };
