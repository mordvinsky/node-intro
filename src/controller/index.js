/* FIXME данная задача не совсем подходит под разделение контроллеров, но все же
		  сделай два класс контролеров, пусть первую половину запросов из задания берет на себя FirstController,
		  а вторую SecondController. При этом класс контроллера не должен принимать никаких аргументов при создании,
		  а роуты для обработки запросов должны быть выделены отдельными методами в духе nestJS. При возникновении ошибки,
		  она должны выбрасываться вне и перехватываться глобальным middleware, нужно добиться того, что бы все ошибки
		  обрабатывались в одном месте, если ты не перехватываешь их на месте через блок try {} catch(e) {}
 */
class Controller {
	constructor(routes, middlewares = []) {
		this.routes = routes;
		this.middlewares = middlewares;
	}

	handle(req, res) {
		try {
			const mathedEntry = this.findMathedEntry(req)
			if (!mathedEntry) throw new Error(`Маршрут не найден: ${req.url}`)

			this.middlewares.forEach(middleware => middleware(req, res, mathedEntry))

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

	use(middleware) {
		this.middlewares.push(middleware)
	}

	findMathedEntry(req) {
		const matched = this.routes.find(entry => entry.path === req.url)
		if (!matched) return this.routes.at(-1)
		return matched
	}
}

module.exports = Controller
