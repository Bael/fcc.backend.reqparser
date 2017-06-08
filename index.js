const http = require('http');
const headersparser=require('./requestparser');

const port = process.env.PORT || 8000;
let server = http.createServer(function(req, res) {
	res.writeHead(200, { 'Content-Type' : 'text/plain'});
	
	const result = headersparser.parse(req);
	res.write(JSON.stringify(result));
	res.end();
});

server.listen(port);