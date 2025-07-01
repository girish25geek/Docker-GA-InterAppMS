const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
const client = new MongoClient(uri);

app.get('/users', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

app.listen(PORT, () => {
  console.log(`API service running on port ${PORT}`);
});
