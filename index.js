const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let urlDatabase = {};

app.get('/', (req, res) => {
  res.send(`
    <form action="/shorten" method="post">
      <input type="url" name="url" required>
      <button type="submit">Shorten</button>
    </form>
  `);
});

app.post('/shorten', (req, res) => {
  let url = req.body.url;
  let id = crypto.randomBytes(4).toString('hex'); // Generate a random id
  urlDatabase[id] = url; // Store the URL
  res.send(`Shortened URL: http://localhost:3000/${id}`);
});

app.get('/:id', (req, res) => {
  let url = urlDatabase[req.params.id];
  if (url) {
    res.redirect(url);
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => console.log('Listening on port 3000'));
