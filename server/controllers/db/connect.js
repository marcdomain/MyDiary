import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:marc2014@localhost:5432/mydiarydb',
  ssl: false,
});

export default pool;
