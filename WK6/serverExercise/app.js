const http = require('http');
const PORT = 8080;

const requestHandler = (request, response) => {
  let responseText = ``;
  if (request.url === "/") {
    responseText = "Welcome!";
  } else if (request.url === "/urls") {
    responseText = `www.google.ca\nwww.google.com\nwww.example.com`;
  } else {
    response.statusCode = 404;
    responseText = `404 Page Not Found`;
  }

  response.end(responseText);
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});