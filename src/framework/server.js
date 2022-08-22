const http = require("http");

class Server {
	constructor({
		framework,
		port,
		fallback,
	            }) {
		this.framework = framework;
		this.port = port;
		this.fallback = fallback;

		this.server = http.createServer(async (req, res) => {
			return await this.framework.handle(req,res)
				.catch((e) => {
					if (!this.fallback) throw e;
					return this.fallback(req, res, e)
				})
		})
	}

	start(callback) {
		return this.server.listen(this.port, callback)
	}
}

module.exports = Server
