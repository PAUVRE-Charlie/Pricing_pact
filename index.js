const express = require('express');
const request = require('request');
var cors = require('cors')

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', cors(), (req, res) => {
  request(
    { url: 'https://dog.ceo/api/breeds/list/all' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      console.log(res.json(JSON.parse(body)))
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));