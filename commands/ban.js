exports.run = (client, message, params) => {

    if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.reply("Vous ne pouvez pas utiliser cette commande (BAN_MEMBERS) est requis")
    }

    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
        return message.reply("Le bot ne peut pas utiliser cette commande (BAN_MEMBERS) est requis")
    }

    if (message.mentions.users.size === 0) {
        return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``).catch(console.error);
    }

    let banMember = message.guild.member(message.mentions.users.first());
    if (!banMember) {
        return message.reply("Cet utilisateur est incorrect ou n'existe pas");
    }

    if (!banMember.bannable) {
        return message.reply("Cet utilisateur ne peut etre banni");
    }
    if (isNaN(params[1]) || params[1] > 7) params[1] = 0;
   banMember.ban(parseInt(params[1]))
        .then(member => {
            return message.channel.sendMessage(`Le membre **${member.user.username}**(${member.user.id}) à bien été banni`)
        })
        .catch(console.error)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['b'],
    permLevel: 3
};

exports.help = {
    name: 'ban',
    description: 'Bannir une personne du server.',
    usage: 'ban <@UserMention>'
};