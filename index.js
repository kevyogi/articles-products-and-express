const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 8080;

http.createServer(app).listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});