module.exports = function( req ) {
	return new Promise((res) => {
		const buffer = [];
		req
			.on('data', chunk => {
				buffer.push(chunk)
			})
			.on('end', () => {
				req.buffer = buffer
				req.json = () => JSON.parse(buffer)
				res()
			})
	})
}
