import express from 'express';
import routes from './api/routes.js';
import { initDb } from './storage/database.js';

const app = express();
app.use(express.json());
app.use(routes);

initDb();

const PORT = 3000;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));