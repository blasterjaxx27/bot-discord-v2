const { Permissions } = require('discord.js');

module.exports = {

    name: 'lock',

    description: 'Verrouiller un canal.',

    execute(message) {

        // Vérifie si l'utilisateur a la permission de gérer les messages dans le canal

        if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')) {

            return message.reply('tu n\'as pas la permission de verrouiller ce canal.');

        }

        // Vérifie si le canal est déjà verrouillé

        if (message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) {

            // Verrouille le canal en enlevant la permission d'envoyer des messages

            message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {

                SEND_MESSAGES: false

            })

            .then(() => {

                message.channel.send('Ce canal a été verrouillé.');

            })

            .catch(error => {

                console.error('Une erreur est survenue lors du verrouillage du canal :', error);

                message.reply('une erreur est survenue lors du verrouillage du canal.');

            });

        } else {

            message.reply('ce canal est déjà verrouillé.');

        }

    },

};

