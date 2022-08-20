const Server = require('./server');
const Router = require('./router');
const routes = require('./router/routes');

const PORT = process.env.PORT || 3000

const server = new Server({
	router: new Router(routes),
	port: PORT,
}).start(() => {
	console.log('ПАЕХАЛЕ ЕПТА')
})

