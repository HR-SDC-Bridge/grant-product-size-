process.env.NODE_ENV = 'dev';
const app = require('./app.js');
const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});
