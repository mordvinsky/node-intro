const FileSystem = require("../modules/filesSystem/services/fileSystem.service");

module.exports = [
	{
		path: 'any',
		handlers: {
			any: (req, res) => {
				res.writeHead(500, {
					'Content-type': 'text.txt/html; charset=utf-8'
				})
				res.end('this is not allowed, go away')
			}
		}
	}
]
