const chalk = require('chalk')
const moment = require('moment');
module.exports = client => {
	console.log(chalk.cyan.bold(
            `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`
            + chalk.underline.green('Bot Connecté'))
    );
}

  