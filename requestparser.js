// this moudle parses http request anf gives info about ip address and user agent
const useragent = require('express-useragent');
const ipaddr = require('ipaddr.js');

module.exports.parse =  function(req) {
	// parse lang
	let language = parseLanguage(req.headers['accept-language']);
	
	// take ip info
	let { address:ip , family:ipFamily, port : port} = req.socket.address();

	
	if (ipFamily === "IPv6") {
		
		let ip6 = ipaddr.parse(ip);
		if (ip6.isIPv4MappedAddress()) {
			ip =ip6.toIPv4Address().toString();
			ipFamily = "IPv4"
		}
	}

	// take sys info
	let parsedUserAgent = useragent.parse(req.headers['user-agent']);
	let { browser:browser, version:browserVersion, os:os, platform:platform, source:software } = parsedUserAgent;

	// construct result
	let parsedReq = {ip, ipFamily, port, language, browser, browserVersion, os, platform, software};

	return parsedReq;

};

function parseLanguage(acceptLanguageString) {
 	return acceptLanguageString.replace(/q=\d.\d/, "")
				.replace(/\w{2}-\w{2}/, "")
				.replace('*', "any")
				.replace(","," ");
		
}


