const Discord = require("discord.js")
exports.run = (client, message, params) => {
                if (message.mentions.users.size < 1) {
                    let embed = new Discord.RichEmbed().setTitle(`Information pour ce membre`).setColor("#51adf6").setThumbnail(message.author.avatarURL)
                    embed.addField("Nom", message.author.username + "#" + message.author.discriminator + " (" + message.author.id + ")")
                    embed.addField("Alias", message.member.nickname)
                    embed.addField("Rejoind le server", message.member.joinedAt)
                    embed.addField("R\364les", message.member.roles.array().splice(1).map(r =>r.name).join(", ") ? message.member.roles.array().splice(1).map(r =>r.name).join(", ") : "Aucun role assigné")
                    embed.addField("Status", message.member.user.presence.status)
                    return message.channel.sendEmbed(embed).catch(console.error);
                } else {
                    let guildMember = message.guild.member(message.mentions.users.first());
                    if (!guildMember) return message.reply("Utilisateur inconnu.");
                    let embed = new Discord.RichEmbed().setColor("#51adf6").setThumbnail(guildMember.user.avatarURL)
                    embed.setTitle(`Information pour le membre ${guildMember.user.username}`)
                    embed.addField("Nom", guildMember.user.username + "#" + guildMember.user.discriminator + " (" + guildMember.id + ")")
                    embed.addField("Alias", guildMember.nickname)
                    embed.addField("Rejoind le server", guildMember.joinedAt)
                    embed.addField("R\364les", guildMember.roles.array().splice(1).map(r =>r.name).join(", ") ? guildMember.roles.array().splice(1).map(r =>r.name).join(", ") : "Aucun role assigné")
                    embed.addField("Status", guildMember.user.presence.status)
                    embed.setColor("#51adf6");
                    return message.channel.sendEmbed(embed).catch(console.error);
                }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'userinfo',
    description: 'Affiche des informations sur l\'utilisateur',
    usage: 'userinfo [@UserMention]'
};
