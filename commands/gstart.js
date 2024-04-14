const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'gstart',

    description: 'Lance un giveaway.',

    usage: '+gstart [récompense] [temps en h]',

    execute(message, args) {

        // Vérifie que l'utilisateur a les permissions nécessaires pour créer un giveaway

        if (!message.member.permissions.has('MANAGE_MESSAGES')) {

            return message.reply('vous n\'avez pas les permissions nécessaires pour exécuter cette commande.');

        }

        // Vérifie que la récompense et la durée du giveaway sont spécifiées

        if (args.length < 2) {

            return message.reply('veuillez spécifier une récompense et une durée pour le giveaway.');

        }

        // Récupère la récompense et la durée du giveaway

        const reward = args.slice(0, args.length - 1).join(' ');

        const duration = parseInt(args[args.length - 1]);

        // Vérifie que la durée spécifiée est un nombre valide

        if (isNaN(duration) || duration <= 0) {

            return message.reply('veuillez spécifier une durée valide en heures pour le giveaway.');

        }

        // Crée le message d'embed pour le giveaway

        const embed = new MessageEmbed()

            .setColor('#0099ff')

            .setTitle('🎉 Giveaway 🎉')

            .setDescription(`Réagissez avec 🎉 pour participer au giveaway !\n\n**Récompense:** ${reward}\n**Durée:** ${duration} heures`)

            .setTimestamp(new Date(Date.now() + duration * 3600000)); // Convertit la durée en millisecondes

        // Envoie le message d'embed dans le canal actuel

        message.channel.send({ embeds: [embed] })

            .then(giveawayMessage => {

                // Ajoute la réaction au message pour permettre aux membres de participer

                giveawayMessage.react('🎉');

                // Lance un setTimeout pour terminer le giveaway après la durée spécifiée

                setTimeout(() => {

                    // Récupère les réactions au message

                    giveawayMessage.reactions.cache.get('🎉').users.fetch()

                        .then(reactionUsers => {

                            // Filtrer les utilisateurs pour exclure le bot et récupérer les participants

                            const participants = reactionUsers.filter(user => !user.bot).size;

                            // Sélectionne un gagnant au hasard parmi les participants

                            const winner = reactionUsers.filter(user => !user.bot).random();

                            // Annonce le gagnant du giveaway

                            const winnerAnnouncement = participants > 0 ?

                                `Félicitations à ${winner} ! Vous avez gagné **${reward}**.` :

                                'Personne n\'a participé au giveaway, le giveaway est annulé.';

                            message.channel.send(winnerAnnouncement);

                        })

                        .catch(console.error);

                }, duration * 3600000); // Convertit la durée en millisecondes

            })

            .catch(console.error);

    },

};

