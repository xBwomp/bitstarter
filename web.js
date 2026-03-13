const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const indexPath = path.join(__dirname, 'index.html');

const serveFile = (response, filePath, contentType) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  response.writeHead(200, { 'Content-Type': contentType });
  response.end(data);
};

const createServer = () => http.createServer((request, response) => {
  if (request.url === '/' || request.url === '/index.html') {
    serveFile(response, indexPath, 'text/html; charset=utf-8');
    return;
  }

  if (request.url.startsWith('/assets/')) {
    const assetPath = path.join(__dirname, request.url);
    if (!fs.existsSync(assetPath)) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    const contentType = assetPath.endsWith('.css')
      ? 'text/css; charset=utf-8'
      : 'application/javascript; charset=utf-8';
    serveFile(response, assetPath, contentType);
    return;
  }

  response.writeHead(404);
  response.end('Not found');
});

if (require.main === module) {
  const port = process.env.PORT || 5000;
  createServer().listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}

module.exports = { createServer };
