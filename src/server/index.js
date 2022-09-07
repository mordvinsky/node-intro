const http = require("http");
// FIXME сделать Server - сервисом при помощи typedi
// FIXME @Service()
class Server {
	constructor({
		controller,
		port,
	            }) {
		this.controller = controller; // FIXME private in constructor
		this.port = port; // FIXME private in constructor

		this.server = http.createServer((req, res) => {
			// FIXME контролеров должно быть несколько
			this.controller.handle(req,res)
		})
	}

	start(callback) {
		return this.server.listen(this.port, callback)
	}
}

module.exports = Server
