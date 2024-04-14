const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'userinfo',

    description: 'Afficher des informations sur un membre du serveur.',

    execute(message, args) {

        // Récupère le membre mentionné dans la commande, ou l'auteur de la commande si aucun membre n'est mentionné

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        // Crée un message d'embed avec les informations sur le membre

        const embed = new MessageEmbed()

            .setColor('#0099ff')

            .setTitle('Informations sur le Membre')

            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

            .addField('Nom d\'utilisateur', member.user.tag, true)

            .addField('ID', member.id, true)

            .addField('Rejoint le', member.joinedAt.toDateString(), true)

            .addField('Créé le', member.user.createdAt.toDateString(), true)

            .addField('Rôles', member.roles.cache.map(role => role.name).join(', '), true)

            .setTimestamp();

        // Envoie le message d'embed

        message.channel.send({ embeds: [embed] });

    },

};

