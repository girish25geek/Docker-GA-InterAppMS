const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);
let db;

app.get('/api/movies', async (req, res) => {
  try {
    await client.connect();
    db = client.db(); // uses default db from URL
    const movies = await db.collection('movies').find().toArray();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch movies', detail: err.message });
  }
});

app.listen(3000, () => console.log("API running on port 3000"));
