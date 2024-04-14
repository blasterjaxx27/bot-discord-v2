const fs = require('fs');

const { Client, Intents, MessageEmbed, Collection } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

const { prefix, token } = require('./config.json');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);

}

client.once('ready', () => {

    console.log(`ConnectÃ© en tant que ${client.user.tag}!`);

});

client.on('messageCreate', message => {

    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {

        command.execute(message, args);

    } catch (error) {

        console.error(error);

        message.reply('une erreur est survenue lors de l\'exÃ©cution de cette commande.');

    }

});

client.on('guildMemberAdd', member => {

    const welcomeMessage = `Bienvenue sur ${member.guild.name}, ${member} ! Nous sommes heureux de t'avoir parmi nous !`;

    const roleToAdd = member.guild.roles.cache.find(role => role.name === 'ï¸²CommunautÃ©');

    if (roleToAdd) {

        member.roles.add(roleToAdd)

            .then(() => console.log(`Le rÃ´le "communautÃ©" a Ã©tÃ© ajoutÃ© Ã  ${member.user.tag}.`))

            .catch(error => console.error('Une erreur est survenue lors de l\'ajout du rÃ´le :', error));

    } else {

        console.error('Le rÃ´le "communautÃ©" n\'a pas Ã©tÃ© trouvÃ©.');

    }

    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === '💬︲chat');

    if (welcomeChannel && welcomeChannel.type === 'GUILD_TEXT' && welcomeChannel.permissionsFor(member.guild.me).has('SEND_MESSAGES')) {

        welcomeChannel.send(welcomeMessage).catch(console.error);

    } else {

        console.error('Le salon d\'arrivÃ©es n\'a pas Ã©tÃ© trouvÃ© ou les permissions nÃ©cessaires ne sont pas accordÃ©es.');

    }

});

client.login(token);

