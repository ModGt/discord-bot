exports.run = (client, message) => {
    message.channel.sendMessage('Ping?')
        .then(msg => {
            msg.edit(`Pong! (took: ${msg.createdTimestamp - message.createdTimestamp}ms)`);
        });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ping',
    description: 'Affiche le temps que met le bot pour répondre',
    usage: 'ping'
};