const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'ban',

    description: 'Bannir un membre du serveur.',

    execute(message, args) {

        // Vérifie si l'utilisateur a la permission de bannir des membres

        if (!message.member.permissions.has('BAN_MEMBERS')) {

            return message.reply('tu n\'as pas la permission de bannir des membres.');

        }

        // Vérifie si le membre à bannir a été mentionné

        const member = message.mentions.members.first();

        if (!member) {

            return message.reply('tu dois mentionner le membre que tu veux bannir.');

        }

        // Récupère la raison du bannissement

        const reason = args.slice(1).join(' ') || 'Aucune raison spécifiée';

        // Envoie un message en DM à la personne avant le bannissement

        const dmEmbed = new MessageEmbed()

            .setColor('#ff0000')

            .setTitle('Bannissement imminent')

            .setDescription(`Tu vas être banni de ${message.guild.name} pour la raison suivante :\n\n${reason}`)

            .setTimestamp();

        member.send({ embeds: [dmEmbed] })

            .then(() => {

                // Bannit le membre après l'envoi du message en DM

                banMember(member, reason);

            })

            .catch(error => {

                console.error(`Impossible d'envoyer un message en DM à ${member.user.tag} :`, error);

                message.reply(`impossible d'envoyer un message en DM à ${member.user.tag}, mais le bannissement va quand même être effectué.`);

                banMember(member, reason);

            });

    },

};

function banMember(member, reason) {

    // Bannit le membre et envoie un message d'embed

    member.ban({ reason })

        .then(() => {

            const embed = new MessageEmbed()

                .setColor('#ff0000')

                .setTitle('Membre Banni')

                .setDescription(`**${member.user.tag}** a été banni du serveur.`)

                .addField('Raison', reason)

                .setTimestamp();

            message.channel.send({ embeds: [embed] });

        })

        .catch(error => {

            console.error('Une erreur est survenue lors du bannissement :', error);

            message.reply('une erreur est survenue lors du bannissement.');

        });

}

