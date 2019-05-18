const app = require('./server/init');
const http = require('http');
const server = http.createServer(app);
const port = process.env.port || 8080;

server.listen(port);
console.log("server started ......")
