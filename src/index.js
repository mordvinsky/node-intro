const Server = require('./server');
const Controller = require('./controller');
const routes = require('./routes');

const PORT = process.env.PORT || 3000

const server = new Server({
	controller: new Controller(routes),
	port: PORT,
}).start(() => {
	console.log('ПАЕХАЛЕ ЕПТА')
})

