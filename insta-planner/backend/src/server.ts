/// <reference path="./types/env.d.ts" />

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  connectTimeout: 10000
});

app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await pool.getConnection();
    console.log('Connection established for register');

    const [existingUser] = await connection.query('SELECT email FROM users WHERE email = ?', [email]);
    if (existingUser) {
      connection.release();
      return res.status(409).json({ error: 'Utilisateur déjà inscrit avec cet email.' });
    }

    const hash = await bcrypt.hash(password, 10);
    await connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash]);
    connection.release();
    console.log('Connection released for register');
    res.status(200).json({ message: 'Inscription réussie!' });
  } catch (err) {
    console.error('Error during register:', err);
    res.status(500).json({ error: (err as Error).message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await pool.getConnection();
    console.log('Connection established for login');
    const rows = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    connection.release();
    console.log('Connection released for login');

    if (rows.length > 0) {
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(200).json({ user: email, token });
      } else {
        res.status(401).json({ error: 'Mot de passe incorrect.' });
      }
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
