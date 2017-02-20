exports.run = (client, message, params) => {
    message.delete();
    let msg;
    if (message.mentions.channels.size === 0) {
        var channel = message.channel
        msg = params.join(" ");
    } else {
        channel = message.mentions.channels.first()
        msg = params.splice(1).join(" ");
    }
    if (!channel) return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``)
    return channel.sendMessage(`${msg}`).catch(console.error)
};



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'say',
    description: 'Envoi un message via le bot.',
    usage: 'say [#channel] <message>'
};