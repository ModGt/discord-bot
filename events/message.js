module.exports = message => {
    let client = message.client;
    let prefix = client.dbs.get(message.guild.id).prefix
    if (message.author.bot) return;

	if(message.isMentioned(client.user) && message.content.length === 21 ) return message.reply(`Le préfix actuel pour le bot est \`${prefix}\``);
    if (!message.content.startsWith(prefix)) return;

    let command = message.content.split(' ')[0].slice(prefix.length);
    let params = message.content.split(' ').slice(1);
    let perms = client.elevation(message.member);
    let cmd;

    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        if (perms < cmd.conf.permLevel) return message.reply('Vous ne pouvez pas exécuter cette commandes, vous n\'avez pas le niveau de permission requis');
        if(!cmd.conf.enabled) return message.reply('La commande a été désactivé');
        cmd.run(client, message, params, perms);
		client.log(`Command used on server (${message.guild.id}) by ${message.author.username}(${message.author.id}): `,cmd.help.name)
    }

};
