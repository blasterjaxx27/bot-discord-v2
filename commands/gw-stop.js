const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'gw-stop',

    description: 'Arrête un giveaway et annonce le gagnant.',

    usage: '+gw-stop [ID du message du giveaway]',

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

                        // Sélectionne un gagnant au hasard parmi les participants

                        const winner = participants.random();

                        // Modifie le message du giveaway pour indiquer qu'il est terminé

                        const newEmbed = giveawayMessage.embeds[0]

                            .setTitle('🎉 Giveaway Terminé 🎉')

                            .setDescription(`Le gagnant est ${winner} ! Félicitations !\n\n**Récompense:** ${giveawayMessage.embeds[0].description}`)

                            .setFooter(`Giveaway terminé | Gagnant : ${winner}`);

                        giveawayMessage.edit({ embeds: [newEmbed] });

                        // Annonce le gagnant du giveaway

                        const winnerAnnouncement = participants.size > 0 ?

                            `Félicitations à ${winner} ! Vous avez gagné **${giveawayMessage.embeds[0].description}**.` :

                            'Personne n\'a participé au giveaway, le giveaway est annulé.';

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

