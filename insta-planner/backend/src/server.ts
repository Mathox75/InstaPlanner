/// <reference path="./types/env.d.ts" />

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

