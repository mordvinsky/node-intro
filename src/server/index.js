const http = require("http");

class Server {
	constructor({
		router,
		port,
	            }) {
		this.router = router;
		this.port = port;

		this.server = http.createServer((req, res) => {
			this.router.handle(req,res)
		})
	}

	start(callback) {
		return this.server.listen(this.port, callback)
	}
}

module.exports = Server
