module.exports = function( res ) {
	res[500] = (message) => {
		res.writeHead(500, {
			'Content-type': 'text.txt/html; charset=utf-8'
		})
		res.end(message)
	}

	res[200] = (type) => (end) => {
		res.writeHead(200, {
			'Content-type': type
		})
		res.end(end)
	}

	res[200].html = (end) => {
		res[200](`text.txt/html; charset=utf-8`)(end)
	}
}
