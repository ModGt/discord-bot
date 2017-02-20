const chalk = require('chalk')
module.exports = client => {
    console.log(chalk.reset.green(`Le bot a été lancé le ${new Date}`));
}