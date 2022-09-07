// FIXME перепиши все на ts) для запуска можно заюзать nodemon
// FIXME все импорты и экспорты через import/export ts-овский
const Server = require('./server');
const Controller = require('./controller');
const routes = require('./routes');

// FIXME странно видеть process.env.PORT, когда в проекте нет .env.example
const PORT = process.env.PORT || 3000

const server = new Server({
	// FIXME хочу два контроллера подключить, как быть?
	controller: new Controller(routes),
	port: PORT,
}).start(() => {
	console.log('ПАЕХАЛЕ ЕПТА')
})

