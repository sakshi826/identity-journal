import { Pool } from 'pg';

const connectionString = import.meta.env.VITE_DATABASE_URL || process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export const getTransaction = async () => {
  const client = await pool.connect();
  const start = async () => {
    await client.query('BEGIN');
  };
  const commit = async () => {
    await client.query('COMMIT');
    client.release();
  };
  const rollback = async () => {
    await client.query('ROLLBACK');
    client.release();
  };
  return { query: client.query.bind(client), start, commit, rollback };
};
