const http = require('http');
const PORT = 8080;

const requestHandler = (request, response) => {
  const responseText = `Requested Path: ${request.url}\nRequest Method: ${request.method}`;
  response.end(responseText);
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});