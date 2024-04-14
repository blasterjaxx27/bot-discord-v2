const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'reroll',

    description: 'Choisit un nouveau gagnant pour un giveaway.',

    usage: '+reroll [ID du message du giveaway]',

    execute(message, args) {

        // Vérifie que l'utilisateur a les permissions nécessaires pour gérer les messages

        if (!message.member.permissions.has('MANAGE_MESSAGES')) {

            return message.reply('vous n\'avez pas les permissions nécessaires pour exécuter cette commande.');

        }

        // Vérifie que l'ID du message du giveaway est spécifié

        if (args.length !== 1) {

            return message.reply('veuillez spécifier l\'ID du message du giveaway.');

        }

        // Récupère l'ID du message du giveaway

        const giveawayMessageId = args[0];

        // Récupère le message du giveaway

        message.channel.messages.fetch(giveawayMessageId)

            .then(giveawayMessage => {

                // Vérifie que le message est un giveaway

                if (!giveawayMessage.embeds.length || !giveawayMessage.embeds[0].title.includes('Giveaway')) {

                    return message.reply('ce message n\'est pas un message de giveaway valide.');

                }

                // Récupère les réactions au message du giveaway

                giveawayMessage.reactions.cache.get('🎉').users.fetch()

                    .then(reactionUsers => {

                        // Filtrer les utilisateurs pour exclure le bot et récupérer les participants

                        const participants = reactionUsers.filter(user => !user.bot);

                        // Vérifie qu'il y a au moins un participant

                        if (participants.size === 0) {

                            return message.reply('aucun participant trouvé pour ce giveaway.');

                        }

                        // Sélectionne un nouveau gagnant au hasard parmi les participants

                        const newWinner = participants.random();

                        // Annonce le nouveau gagnant du giveaway

                        const winnerAnnouncement = `Un nouveau gagnant a été choisi pour ce giveaway : ${newWinner}. Félicitations !`;

                        message.channel.send(winnerAnnouncement);

                    })

                    .catch(console.error);

            })

            .catch(error => {

                console.error('Erreur lors de la récupération du message du giveaway :', error);

                message.reply('une erreur est survenue lors de la récupération du message du giveaway.');

            });

    },

};

