const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'renew',

    description: 'Supprime le salon et le recrée avec le même nom et le même emplacement.',

    execute(message) {

        // Vérifie si l'utilisateur a la permission de gérer les salons

        if (!message.member.permissions.has('MANAGE_CHANNELS')) {

            return message.reply('vous n\'avez pas les permissions nécessaires pour exécuter cette commande.');

        }

        // Mémorise le nom et la catégorie du salon à recréer

        const channelName = message.channel.name;

        const categoryID = message.channel.parentId;

        // Supprime le salon

        message.channel.delete()

            .then(deletedChannel => {

                // Recrée le salon dans la même catégorie

                message.guild.channels.create(channelName, {

                    type: 'text',

                    parent: categoryID

                }).then(createdChannel => {

                    // Mentionne l'auteur dans le nouveau salon

                    const embed = new MessageEmbed()

                        .setColor('#0099ff')

                        .setDescription(`${message.author} a recréé ce salon.`);

                    createdChannel.send({ embeds: [embed] });

                }).catch(error => {

                    console.error('Erreur lors de la recréation du salon :', error);

                    message.reply('une erreur est survenue lors de la recréation du salon.');

                });

            })

            .catch(error => {

                console.error('Erreur lors de la suppression du salon :', error);

                message.reply('une erreur est survenue lors de la suppression du salon.');

            });

    },

};

