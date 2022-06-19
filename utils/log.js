const chalk = require('chalk');
const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];
module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[ ❕ ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[ ❕ ] » ') + data);
			break;
		default:
			console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`${option} » `) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`» •GK• « `) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
			break;
		case "error":
			console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`» •GK• « `) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
			break;
		default:
			console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`» •GK• « `) + chalk[colors[Math.floor(Math.random() * colors.length)]](data));
			break;
	}
}
module.exports.banner = (data) => {
	const rdcl = ['blue', 'yellow', 'green', 'red', 'magenta', 'yellowBright', 'blueBright', 'magentaBright']
	const color = chalk[rdcl[Math.floor(Math.random() * rdcl.length)]]
	console.log(color(data));
}
