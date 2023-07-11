import express from 'express';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import {verify } from 'jsonwebtoken';
import cors from 'cors';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/api/validate', (req: Request, res: Response) => {
  const body = req.body;
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('Missing JWT_SECRET');
  }
  try {
    const decoded = verify(body.jwt, secret);
    res.status(200).json(decoded)
  } catch (err) {
    res.status(400).json(err)
  }

  });

app.listen('8000', () => {
  console.log('Server is listening on port 8000');
});

