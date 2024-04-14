const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'warn',

    description: 'Avertir un membre du serveur.',

    execute(message, args) {

        // Vérifie si l'utilisateur a la permission de gérer les avertissements

        if (!message.member.permissions.has('MANAGE_MESSAGES')) {

            return message.reply('tu n\'as pas la permission de gérer les messages.');

        }

        // Vérifie si le membre à avertir a été mentionné

        const member = message.mentions.members.first();

        if (!member) {

            return message.reply('tu dois mentionner le membre que tu veux avertir.');

        }

        // Récupère la raison de l'avertissement

        const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

        // Envoie un message en DM à la personne avertie

        const dmEmbed = new MessageEmbed()

            .setColor('#ff0000')

            .setTitle('Avertissement')

            .setDescription(`Tu as reçu un avertissement sur ${message.guild.name} pour la raison suivante :\n\n${reason}`)

            .setTimestamp();

        member.send({ embeds: [dmEmbed] })

            .then(() => {

                const embed = new MessageEmbed()

                    .setColor('#ff0000')

                    .setTitle('Membre Averti')

                    .setDescription(`**${member.user.tag}** a été averti.`)

                    .addField('Raison', reason)

                    .setTimestamp();

                message.channel.send({ embeds: [embed] });

            })

            .catch(error => {

                console.error(`Impossible d'envoyer un message en DM à ${member.user.tag} :`, error);

                message.reply(`impossible d'envoyer un message en DM à ${member.user.tag}, mais l'avertissement a été enregistré.`);

            });

    },

};

