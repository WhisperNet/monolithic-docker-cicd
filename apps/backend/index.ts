import express from 'express';
import { prismaClient } from 'db/client';

const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  prismaClient.user
    .findMany()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    res.status(400).json({ message: 'Username and password is required' });
  prismaClient.user
    .create({
      data: {
        username,
        password,
      },
    })
    .then((user) => {
      res.status(201).json(user);
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
