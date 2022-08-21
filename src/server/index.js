const http = require("http");

class Server {
	constructor({
		controller,
		port,
	            }) {
		this.controller = controller;
		this.port = port;

		this.server = http.createServer((req, res) => {
			this.controller.handle(req,res)
		})
	}

	start(callback) {
		return this.server.listen(this.port, callback)
	}
}

module.exports = Server
