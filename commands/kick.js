const settings = require('../settings.json');
exports.run = (client, message, params) => {
    if (!message.member.hasPermission('KICK_MEMBERS')){
        return message.reply("Vous ne pouvez pas utiliser cette commande (KICK_MEMBERS) est requis")
    }

    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
        return message.reply("Le bot ne peut pas utiliser cette commande (KICK_MEMBERS) est requis").catch(console.error);
    }

    if (message.mentions.users.size === 0) {
        return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``).catch(console.error);
    }

    let kickMember = message.guild.member(message.mentions.users.first());
    if(kickMember.id === settings.ownerid) return message.reply("Vous ne pouvez pas expulser cette personne");

    if (!kickMember) {
        return message.reply("Cet utilisateur est incorrect ou n'existe pas")
    }

    kickMember.kick()
        .then(member => {
            message.reply(member.user.username + " à bien été éjecté du serveur")
        })
        .catch(console.error)

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['k'],
    permLevel: 2
};

exports.help = {
    name: 'kick',
    description: 'Expulse une personne du server.',
    usage: 'kick <@UserMention>'
};