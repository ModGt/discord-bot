exports.run = (client, message, params) => {
    if (!message.member.hasPermission('BAN_MEMBERS'))
    {
        return message.reply("Vous ne pouvez pas utiliser cette commande (BAN_MEMBERS) est requis")
    }

    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
        return message.reply("Le bot ne peut pas utiliser cette commande (BAN_MEMBERS) est requis")
    }
    let args = message.content.split(" ").slice(1);
    if (!params[0]) {
        return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``)
    }

    if (!params[0].match(/^[0-9]{18}$/)) return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``);

    message.guild.fetchBans()
        .then(ban => {
            if (ban.has(parseInt(params[0]))) {
                message.guild.unban(params[0])
                    .then(user =>
                        message.reply(`Cet utilisateur est maintenant débanni`))
                    .catch(console.error);

            } else {
                return message.reply(`Cet id est inconnu de la banlist`)
            }

        })
        .catch(console.error);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['pardon'],
    permLevel: 3
};

exports.help = {
    name: 'unban',
    description: 'Débannir une personne du serveur.',
    usage: 'unban <userId>'
};