import path from 'path';

export default {
  client: 'pg',
  connection: {
    user: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_HOST === 'postgres' ? 5432 : 5433,
    password: 'docker',
    database: 'posts'
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
};
