const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'embed',

    description: 'Crée un message embed avec un titre et une description',

    execute(message, args) {

        if (args.length < 2) {

            message.reply('Veuillez envoyer le titre de l\'embed suivi de la description.');

            return;

        }

        const embedTitle = args.shift();

        const embedDescription = args.join(' ');

        const embed = new MessageEmbed()

            .setColor('#0099ff')

            .setTitle(embedTitle)

            .setDescription(embedDescription);

        message.channel.send({ embeds: [embed] });

    },

};

