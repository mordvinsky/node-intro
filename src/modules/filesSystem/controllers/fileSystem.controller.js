const service = require('../services/fileSystem.service')

class FileSystemController {
	constructor(service) {
		this.service = service
	}

	install(path) {
		console.log(path)
		return {
			path: path,
			handlers: {
				POST: this.service.createFile,
				PATCH: this.service.updateFile,
				GET: this.service.readFile,
				DELETE: this.service.deleteFile,
			}
		}
	}
}

module.exports = new FileSystemController(service)
