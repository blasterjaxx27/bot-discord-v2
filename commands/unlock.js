const { Permissions } = require('discord.js');

module.exports = {

    name: 'unlock',

    description: 'Déverrouiller un canal.',

    execute(message) {

        // Vérifie si l'utilisateur a la permission de gérer les messages dans le canal

        if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')) {

            return message.reply('tu n\'as pas la permission de déverrouiller ce canal.');

        }

        // Vérifie si le canal est déjà déverrouillé

        if (!message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) {

            // Déverrouille le canal en ajoutant la permission d'envoyer des messages

            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {

                SEND_MESSAGES: true

            })

            .then(() => {

                message.channel.send('Ce canal a été déverrouillé.');

            })

            .catch(error => {

                console.error('Une erreur est survenue lors du déverrouillage du canal :', error);

                message.reply('une erreur est survenue lors du déverrouillage du canal.');

            });

        } else {

            message.reply('ce canal est déjà déverrouillé.');

        }

    },

};

