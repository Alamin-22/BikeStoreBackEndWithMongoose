import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) }); // => this is used to connect current working dir to the ENV file.

export default {
  port: process.env.PORT,
  dataBaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV,
};
