exports.run = (client, message, params) => {
    if (params.size < 2) return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``);
    if (params[0] !== 'prefix' && params[0] !== 'modRole' && params[0] !== 'adminRole')
        return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``);
    let role
    switch (params[0]) {
        case 'modRole':
            role = message.guild.roles.find('name', params[1]);
            if (!role) return message.reply('Le role n\'existe pas sur le server');
            break;
        case 'adminRole':
            role = message.guild.roles.find('name', params[1]);
            if (!role) return message.reply('Le role n\'existe pas sur le server');
            break;
        default:
            break;
    }
    client.updateGuild(message.guild, params)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['set'],
    permLevel: 3
};

exports.help = {
    name: 'settings',
    description: 'Permet d\'effectuer la configuration du server',
    usage: 'settings <prefix|modRole|adminRole> <var>'
};