import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

import express from 'express';
import cors from 'cors';
import routes from './routes';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)
app.use('/images', express.static(resolve(__dirname, '..', 'public', 'uploads')))

app.listen(3333);