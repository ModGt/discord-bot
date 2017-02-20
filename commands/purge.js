exports.run = function (client, message, args) {
    let messagecount = parseInt(args.join(' '));
    message.channel.fetchMessages({
        limit: `${isNaN(messagecount) ? 100 : messagecount }`
    })
        .then(messages => {
            return message.channel.bulkDelete(messages)
                .then(msg=> message.channel.sendMessage(`__**${msg.size}**__ messages ont été supprimé`)
                    .then(m => m.delete(3000)))
                .catch(console.error);
        })
        .catch(console.error)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['p'],
    permLevel: 2
};

exports.help = {
    name: 'purge',
    description: 'Supprime X nombre de message dans le canal.',
    usage: 'purge <number>'
};