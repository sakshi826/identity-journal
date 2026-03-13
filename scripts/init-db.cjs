const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function initSchema() {
  const schemaPath = path.join(__dirname, '../database/schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  try {
    console.log('Applying schema...');
    await pool.query(schema);
    console.log('Schema applied successfully.');
    
    // Test CRUD
    console.log('Testing CRUD...');
    const testUserId = 999999999;
    
    // Create
    await pool.query('INSERT INTO users(id) VALUES($1) ON CONFLICT (id) DO NOTHING', [testUserId]);
    console.log('✔ User created/verified');
    
    const journalRes = await pool.query('INSERT INTO journals(user_id) VALUES($1) RETURNING id', [testUserId]);
    const journalId = journalRes.rows[0].id;
    console.log('✔ Journal created');
    
    await pool.query('INSERT INTO entries(journal_id, content) VALUES($1, $2)', [journalId, 'Test entry']);
    console.log('✔ Entry created');
    
    // Read
    const readRes = await pool.query('SELECT * FROM entries WHERE journal_id = $1', [journalId]);
    if (readRes.rows.length > 0) console.log('✔ Read success');
    
    // Delete
    await pool.query('DELETE FROM journals WHERE id = $1', [journalId]);
    console.log('✔ Delete success');
    
    process.exit(0);
  } catch (err) {
    console.error('Error during schema initialization:', err);
    process.exit(1);
  }
}

initSchema();
