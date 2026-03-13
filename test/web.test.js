const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');

const { createServer } = require('../web');

test('server returns landing page html at /', async () => {
  const server = createServer().listen(0);
  const port = server.address().port;

  const body = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/`, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });

  server.close();
  assert.match(body, /Teacher's Pet/);
  assert.match(body, /Bitstarter/);
});
