import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { createConnection } from 'typeorm';
import { dbConfig } from './config/index';

ValidateEnv();

const main = async () => {
  try {
    const connection = await createConnection(dbConfig);
    if (connection.isConnected) {
      const app = new App([new UserRoute(), new AuthRoute()]);
      app.listen();      
    } else {
      console.log('Failed to connect to database');
    }
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
};

main();
