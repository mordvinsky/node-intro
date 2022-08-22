const parseData = require("./internalMiddlewares/parseData")
const createShortcuts = require("./internalMiddlewares/createShortcuts")

class Sonic {
	constructor({
	  routes = {},
	  beforeEntryMiddlewares = [],
	  afterEntryMiddlewares = [],
	            } = {}) {
		this.routes = routes;
		this.beforeEntryMiddlewares = beforeEntryMiddlewares;
		this.afterEntryMiddlewares = afterEntryMiddlewares;
	}

	async handle(req, res) {
		await parseData(req)
		await createShortcuts(res)

		this.beforeEntryMiddlewares.forEach(middleware => middleware(req, res))

		const mathedEntry = this.findMathedEntry(req)
		if (!mathedEntry) throw new Error(`Маршрут не найден: ${req.url}`)

		this.afterEntryMiddlewares.forEach(middleware => middleware(req, res, mathedEntry))

		const handlers = mathedEntry.handlers
		if (!handlers) throw new Error(`Нет обработчиков для маршрута: ${req.url}`)

		const matchedHandler = handlers[req.method] || mathedEntry.handlers.any
		if (!matchedHandler) throw new Error(`Нет обработчика для метода: ${req.method}`)

		return matchedHandler(req, res)
	}

	use(middleware) {
		this.beforeEntryMiddlewares.push(middleware)
	}

	install(moduleController, route) {
		this.routes.push(moduleController.install(route))
	}

	findMathedEntry(req) {
		const matched = this.routes.find(entry => entry.path === req.url)
		if (!matched) return this.routes.find(entry => entry.path === "any")
		return matched
	}
}

module.exports = Sonic
