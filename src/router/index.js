class Router {
	constructor(routes) {
		this.routes = routes
	}

	handle(req, res) {
		try {
			console.log(req.url)
			const mathedEntry = this.findMathedEntry(req)
			if (!mathedEntry) throw new Error(`Маршрут не найден: ${req.url}`)

			const handlers = mathedEntry.handlers
			if (!handlers) throw new Error(`Нет обработчиков для маршрута: ${req.url}`)

			const matchedHandler = handlers[req.method] || mathedEntry.handlers.any
			if (!matchedHandler) throw new Error(`Нет обработчика для метода: ${req.method}`)

			matchedHandler(req, res)
		} catch (e) {
			res.writeHead(401, {
				'Content-type': 'text/html; charset=utf-8'
			})
			res.end('Произошла непредвиденная ошибка: ' + e.message)
		}
	}

	findMathedEntry(req) {
		const matched = this.routes.find(entry => entry.path === req.url)
		if (!matched) return this.routes.at(-1)
		return matched
	}
}

module.exports = Router
