const Server = require('./framework/server');
const Sonic = require('./framework/sonic');
const routes = require('./routes');
const { PORT } = require("./utils/config");
const fileSystemController = require("./modules/filesSystem/controllers/fileSystem.controller");

const sonic = new Sonic({
	routes
})
sonic.install(fileSystemController, '/fs')

new Server({
	framework: sonic,
	port: PORT,
	fallback: (req, res, e) => {
		console.error(e)
		res[500]('Вылетело наверх: ' + e.message)
	}
}).start(() => {
	console.log('ПАЕХАЛЕ ЕПТА')
})

