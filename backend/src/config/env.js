import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const required = ['MONGODB_CONN_STR'];

required.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing env var: ${key}`);
  }
});

export const ENV = {
  PORT: process.env.PORT || 8000,
  MONGODB_CONN_STR: process.env.MONGODB_CONN_STR,
  FRONTEND_URL: process.env.FRONTEND_URL || '*',
  ENV: process.env.ENV || 'prod',
};
