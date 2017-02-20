const chalk = require('chalk')
module.exports = client => {
    console.log(chalk.yellow(`Reconnection à ${new Date}`));
}