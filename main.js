const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
const sql = require("sqlite");

client.dbs = new Discord.Collection();
sql.open('./guilds.sqlite').then(()=> {
    sql.all(`SELECT * FROM settings`).then(rows => {
        rows.forEach(row => {
            client.dbs.set(row.guildID, row);
        })

    }).catch(console.error)
}).catch(console.error)

client.newGuild = guild => {
    sql.open('./guilds.sqlite').then(()=> {
        sql.run('INSERT INTO settings (guildID, ownerID, prefix, adminRole,modRole) VALUES (?, ?, ?, ?, ?)',
            [guild.id, guild.ownerID, "!", "Administrator", "Moderator"]).then(() => {
            let newGuild = {
                guildID: `${guild.id}`,
                ownerID: `${guild.ownerID}`,
                prefix: '!',
                adminRole: 'Administrator',
                modRole: 'Moderator'
            }
            client.dbs.set(guild.id, newGuild)
        }).catch(console.error)
    }).catch(console.error)
}

client.deleteGuild = guild => {
    sql.open('./guilds.sqlite').then(()=> {
        sql.run('DELETE FROM settings WHERE guildID = ?', [guild.id])
            .then(() => {
                client.dbs.delete(guild.id)
            }).catch(console.error)
    }).catch(console.error)
}

client.updateGuild = (guild, params) => {
    sql.open('./guilds.sqlite').then(()=> {
        switch (params[0]) {
            case 'prefix':
                sql.run('UPDATE settings SET prefix = ? WHERE guildID = ?', [params[1], guild.id]).then(()=> {
                    let buff = client.dbs.get(guild.id)
                    client.dbs.delete(guild.id)
                    let updateContent = {
                        guildID: `${buff.id}`,
                        ownerID: `${buff.ownerID}`,
                        prefix: params[1],
                        adminRole: `${buff.adminRole}`,
                        modRole: `${buff.modRole}`
                    }
                    client.dbs.set(guild.id, updateContent);
                    buff = null;
                    guild.defaultChannel.sendMessage(`Le nouveau prefix est:\`${client.dbs.get(guild.id).prefix}\``)
                });
                break;
            case 'adminRole':
                sql.run('UPDATE settings SET adminRole = ? WHERE guildID = ?', [params[1], guild.id]).then(()=> {
                        let buff = client.dbs.get(guild.id)
                        client.dbs.delete(guild.id)
                        let updateContent = {
                            guildID: `${buff.id}`,
                            ownerID: `${buff.ownerID}`,
                            prefix: `${buff.prefix}`,
                            adminRole: params[1],
                            modRole: `${buff.modRole}`
                        }
                        client.dbs.set(guild.id, updateContent);
                        buff = null;
                    guild.defaultChannel.sendMessage(`Mise à jour du adminRole, le adminRole est actuellement :\`${client.dbs.get(guild.id).adminRole}\``)
                    }
                );
                break;
            case 'modRole':
                sql.run('UPDATE settings SET modRole = ? WHERE guildID = ?', [params[1], guild.id]).then(()=> {
                    let buff = client.dbs.get(guild.id)
                    client.dbs.delete(guild.id)
                    let updateContent = {
                        guildID: `${buff.id}`,
                        ownerID: `${buff.ownerID}`,
                        prefix: `${buff.prefix}`,
                        adminRole: `${buff.adminRole}`,
                        modRole: params[1]
                    }
                    client.dbs.set(guild.id, updateContent);
                    buff = null;
                    guild.defaultChannel.sendMessage(`Mise à jour du modRole, le modRole est actuellement :\`${client.dbs.get(guild.id).modRole}\``)
                });
        }
    }).catch(console.error)
}


client.discord = Discord;
client.log = (message, params = null) => {
    console.log(chalk.cyan.bold(
            `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`
            + chalk.reset.cyan(message)) +

        `${params ? chalk.bold.red(params) : ''}`
    );
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    client.log(
        `Loading a total of ${files.length} commands.`
    );
    files.forEach(f => {
        let props = require(
            `./commands/${f}`
        );
        client.log(
            `Loading Command: `
            , props.help.name);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});


client.elevation = message => {
    let permlvl = 0;
    let mod_role = message.guild.roles.find('name', client.dbs.get(message.guild.id).modRole);
    let admin_role = message.guild.roles.find('name', client.dbs.get(message.guild.id).adminRole);
    let guild_owner = client.dbs.get(message.guild.id).ownerID;
    if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 1;
    if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 2;
    if (message.author.id === guild_owner) permlvl = 3;
    if (message.author.id === "246779580902277121") permlvl = 4;
    return permlvl;

};


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(settings.token);
