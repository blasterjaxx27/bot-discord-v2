const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'avatar',

    description: 'Affiche l\'avatar d\'un membre du serveur.',

    execute(message, args) {

        // Récupère le membre mentionné dans la commande, ou l'auteur de la commande si aucun membre n'est mentionné

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        // Crée un message d'embed avec l'avatar du membre

        const embed = new MessageEmbed()

            .setColor('#0099ff')

            .setTitle(`Avatar de ${member.user.tag}`)

            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))

            .setTimestamp();

        // Envoie le message d'embed

        message.channel.send({ embeds: [embed] });

    },

};

