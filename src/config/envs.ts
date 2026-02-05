

import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

  HOST: get('HOST').required().asString(),
  PORT: get('PORT').required().asPortNumber(),

  DB_HOST: get('DB_HOST').required().asString(),
  DB_PORT: get('DB_PORT').required().asPortNumber(),
  DB_PASSWORD: get('DB_PASSWORD').asString(),
  DB_USERNAME: get('DB_USERNAME').required().asString(),
  DB_NAME: get('DB_NAME').required().asString(),

};
