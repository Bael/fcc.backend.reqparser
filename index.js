const http = require('http');
const useragent= require('useragent');
const port = process.env.PORT || 8000;
let server = http.createServer(function(req, res) {
	console.log(JSON.stringify(req.headers));
	res.writeHead(200, { 'Content-Type' : 'text/plain'});
	res.write(JSON.stringify(req.headers));
	
	//console.log(req.socket.address());
	res.write(JSON.stringify(req.socket.address()));

	var agent = useragent.parse(req.headers['user-agent']);
	res.write(JSON.stringify(agent));

	res.end();
});

server.listen(port);