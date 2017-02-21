exports.run = (client, message, params) => {
    if (!params.length) return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``);
    let roleName = params[1];
    switch (params[0]) {
        case 'create':
            if (!roleName) return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``);
            message.guild.createRole({
                name: roleName,
                color: colorResolvable(params[2])
            }).catch(console.error);
            return message.reply(`Le role \`${roleName}\` a bien été crée`);
            break;
        case 'delete':
            if (!roleName) return message.reply(`Veuillez respecter la syntaxe: \`${this.help.usage}\``);
            let role = message.guild.roles.find("name", roleName);
            if (!role) return message.reply("Ce role n'existe pas");
            if (message.member.highestRole.comparePositionTo(role) < 0)
                return message.reply('Vous ne pouvez pas supprimer ce role, Vous n\'avez pas les permission necessaires');

            role.delete().then(r => {
                return message.reply(`Le role \`${r.name}\` a bien été supprimé `);

            }).catch(console.log);
            break;
        case 'colorlist':
           return  message.reply(`Liste des couleurs disponibles : 
            AQUA,GREEN,BLUE,PURPLE,GOLD,ORANGE,RED,GREY,DARKER_GREY,NAVY,DARK_AQUA,DARK_GREEN,DARK_BLUE,DARK_PURPLE,DARK_GOLD,DARK_ORANGE,DARK_RED,DARK_GREY,LIGHT_GREY,DARK_NAVY`);
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
    name: 'srole',
    description: 'Crée ou supprime un role sur le serveur',
    usage: 'srole <create|delete|colorlist> <rolename> [colorResolvable]'
};

function colorResolvable(str) {
    let colorName = [
        'AQUA',
        'GREEN',
        'BLUE',
        'PURPLE',
        'GOLD',
        'ORANGE',
        'RED',
        'GREY',
        'DARKER_GREY',
        'NAVY',
        'DARK_AQUA',
        'DARK_GREEN',
        'DARK_BLUE',
        'DARK_PURPLE',
        'DARK_GOLD',
        'DARK_ORANGE',
        'DARK_RED',
        'DARK_GREY',
        'LIGHT_GREY',
        'DARK_NAVY',
    ]

    if (!str) return '\'DEFAULT\'';
    if (str.match(/^[0-9]{1,8}$/)) {
        return parseInt(str) > 16777215 ? '\'DEFAULT\'' : parseInt(str);
    } else if (str.startsWith("#")) {
        if (str.length > 7) return '\'DEFAULT\'';
        return str;
    } else {
        if (colorName.indexOf(str.toUpperCase()) !== -1) {
            return `${str.toUpperCase()}`;
        } else {
            return '\'DEFAULT\'';
        }
    }
    return '\'DEFAULT\'';
}