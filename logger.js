const EventEmitter = require('events');


const url = 'http://mylogger.io/log';

class Logger extends EventEmitter {

    log = (message) => {
        console.log(message);

        this.emit('messageLogger', {id: 1, url: 'http://'});
    }
}

// module.exports = Logger;

const http = require("https");

const options = {
	"method": "GET",
	"hostname": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
	"port": null,
	"path": "/apiservices/browsequotes/v1.0/US/USD/en-US/SDQ-sky/JFK-sky/2020-12-27?inboundpartialdate=2021-12-01",
	"headers": {
		"x-rapidapi-key": "cfb6401dbfmsh4cd960068254e59p15c792jsn024a69288566",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();