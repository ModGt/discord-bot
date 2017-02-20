const sql = require("sqlite");
sql.open('./guilds.sqlite');
exports.run = (client, message, params) => {

    let guild =  client.dbs.get(message.guild.id);

        if (!params[0]) {
            const commandNames = Array.from(client.commands.keys());
            const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
            message.channel.sendCode('asciidoc', `= Liste des commandes =\n\n[Utilise ${guild.prefix}help <nomdelacommande> pour plus de details]\n\n${client.commands.filter(c => client.elevation(message) >= c.conf.permLevel).map(c => `${guild.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description} ${c.conf.enabled ? '' : '[Commande désactivée]'}`).join('\n')}`);
        } else {
            let command = params[0];
            if (client.commands.has(command)) {
                command = client.commands.get(command);
                if (client.elevation(message) < command.conf.permLevel) return;
                message.channel.sendCode('asciidoc', `= ${command.help.name} = \n${command.help.description}\nUsage:  ${guild.prefix}${command.help.usage}${command.conf.aliases.length ? `\nAliases: ${command.conf.aliases.join(",")}` : ''}`);
            }
        }


};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h'],
    permLevel: 0
};

exports.help = {
    name: 'help',
    description: 'Affiche toute les commandes disponible pour les permissions que vous avez.',
    usage: 'help [command]'
};