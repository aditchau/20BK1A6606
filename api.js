const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URL provided.' });
  }

  const urls = Array.isArray(url) ? url : [url];

  try {
    const requests = urls.map(url => axios.get(url));
    const responses = await Promise.all(requests);
    const numbers = [];

    for (const response of responses) {
      const data = response.data;

      // Extract numbers from the response data (assuming they are in an array)
      if (Array.isArray(data)) {
        numbers.push(...data.filter(item => typeof item === 'number'));
      }
    }

    return res.json({ numbers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching the numbers.' });
  }
});

app.listen(port, () => {
  console.log(`number-management-service is running on port ${port}.`);
});