exports.run = (client, message, params) => {
    if (!params.length) return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``)
    let guildMember;
    let role;
    switch (params[0]) {
        case 'add':
            if (!message.mentions.users.size) return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``);
            guildMember = message.guild.member(message.mentions.users.first().id);
            role = message.guild.roles.find("name", params[1]);
            if (!role) return message.reply("Ce role n'existe pas sur le serveur");
            if((message.guild.member(message.author.id).highestRole.position <= role.position) && (client.elevation(message) < 4))
                return message.reply('Vous n\'avez pas les permissions requises pour ajouter ce rôle à une personne');
            return guildMember.addRole(role.id).then((member)=> {
                message.reply(`Le role ${params[1]} a bien été ajouté à ${member.user.username}`)
            }).catch(console.error)
            break;
        case 'remove':
            if (!message.mentions.users.size) return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``);
            guildMember = message.guild.member(message.mentions.users.first().id);
            role = message.guild.roles.find("name", params[1]);
            if (!role) return message.reply("Ce role n'existe pas sur le serveur");
            if((message.guild.member(message.author.id).highestRole.position <= role.position) && (client.elevation(message) < 4))
                return message.reply('Vous n\'avez pas les permissions requises pour supprimer ce rôle à une personne');
            return guildMember.removeRole(role.id).then((member)=> {
                message.reply(`Le role ${params[1]} a bien été supprimé sur ${member.user.username}`)
            }).catch(console.error)
            break;
        default:
            return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``)
            break;
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: 'role',
    description: 'Ajouter ou retirer un role à une personne',
    usage: 'role <add|remove> <rolename> <@Usermention>'
};