module.exports = [
	{
		path: '/',
		handlers: {
			GET: (req, res) => {
				res.writeHead(200, {
					'Content-type': 'text/html; charset=utf-8'
				})
				res.end('handling get method' + Math.random())
			},
			POST: (req, res) => {
				res.writeHead(200, {
					'Content-type': 'text/html; charset=utf-8'
				})
				res.end('handling post method' + Math.random())
			}
		},
	},
	{
		path: '/hello',
		handlers: {
			GET: (req, res) => {
				res.writeHead(200, {
					'Content-type': 'text/html; charset=utf-8'
				})
				res.end('Hello World! ' + Math.random())
			}
		}
	},
	{
		path: '/google',
		handlers: {
			GET: (req, res) => {
				res.writeHead(301, {
					Location: 'http://google.com?q=node.js'
				});
				res.end();
			}
		}
	},
	{
		path: '/reverser',
		handlers: {
			POST: (req, res) => {
				let body = []
				req
					.on('data', chunk => body.push(chunk))
					.on('end', () => {
						body = JSON.parse(Buffer.concat(body).toString())
						res.writeHead(200, {
							'Content-type': 'text/html; charset=utf-8'
						})
						res.end(
							'reversed: ' + body.value
								.split("")
								.reverse()
								.join("")
						)
					})
			}
		}
	},
	{
		path: '/env',
		handlers: {
			GET: (req, res) => {
				res.writeHead(200, {
					'Content-type': 'text/html; charset=utf-8'
				})
				res.end(
					'env OS: ' + process.env.OS
				)
			}
		}
	},
	{
		path: '/cookies',
		handlers: {
			POST: (req, res) => {
				let body = []
				req
					.on('data', chunk => body.push(chunk))
					.on('end', () => {
						body = JSON.parse(Buffer.concat(body).toString())
						res.writeHead(200, {
							'Content-type': 'text/html; charset=utf-8',
							'Set-cookie': `id=${body.id}`
						})
						res.end(
							`set id: ${body.id}`
						)
					})
			},
			GET: (req, res) => {
				console.log(req.headers)
				res.writeHead(200, {
					'Content-type': 'text/html; charset=utf-8',
				})
				res.end(`Your id is: ${req.headers.cookie}`)
			}
		}
	},
	{
		handlers: {
			any: (req, res) => {
				res.writeHead(500, {
					'Content-type': 'text/html; charset=utf-8'
				})
				res.end('this is not allowed, go away')
			}
		}
	}
]
