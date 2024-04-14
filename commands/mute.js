const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'mute',

    description: 'Muter un membre du serveur.',

    execute(message, args) {

        // Vérifie si l'utilisateur a la permission de gérer les rôles

        if (!message.member.permissions.has('MANAGE_ROLES')) {

            return message.reply('tu n\'as pas la permission de gérer les rôles.');

        }

        // Vérifie si le membre à muter a été mentionné

        const member = message.mentions.members.first();

        if (!member) {

            return message.reply('tu dois mentionner le membre que tu veux muter.');

        }

        // Récupère la durée du mute

        const duration = parseInt(args[1]) || 0;

        if (isNaN(duration) || duration <= 0) {

            return message.reply('tu dois spécifier une durée de mute valide en heures.');

        }

        // Vérifie si le rôle "Muted" existe, sinon le crée

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        if (!muteRole) {

            message.guild.roles.create({

                name: 'Muted',

                permissions: []

            })

            .then(role => {

                message.guild.channels.cache.forEach(channel => {

                    channel.permissionOverwrites.edit(role, { SEND_MESSAGES: false });

                });

                muteMember(member, role, duration);

            })

            .catch(error => {

                console.error('Une erreur est survenue lors de la création du rôle :', error);

                message.reply('une erreur est survenue lors de la création du rôle Muted.');

            });

        } else {

            muteMember(member, muteRole, duration);

        }

    },

};

function muteMember(member, muteRole, duration) {

    // Donne le rôle mute au membre

    member.roles.add(muteRole)

        .then(() => {

            const embed = new MessageEmbed()

                .setColor('#ff0000')

                .setTitle('Membre Muté')

                .setDescription(`**${member.user.tag}** a été muté pendant ${duration} heures.`)

                .setTimestamp();

            message.channel.send({ embeds: [embed] });

            // Envoie un message en DM à la personne mutée

            const dmEmbed = new MessageEmbed()

                .setColor('#ff0000')

                .setTitle('Tu as été muté')

                .setDescription(`Tu as été muté sur ${message.guild.name} pendant ${duration} heures.`)

                .setTimestamp();

            member.send({ embeds: [dmEmbed] })

                .catch(error => console.error(`Impossible d'envoyer un message en DM à ${member.user.tag} :`, error));

            // Délai pour enlever le rôle mute après la durée spécifiée

            setTimeout(() => {

                member.roles.remove(muteRole)

                    .then(() => {

                        const unmuteEmbed = new MessageEmbed()

                            .setColor('#00ff00')

                            .setTitle('Membre Démuté')

                            .setDescription(`Le mute de **${member.user.tag}** a expiré.`)

                            .setTimestamp();

                        message.channel.send({ embeds: [unmuteEmbed] });

                    })

                    .catch(error => {

                        console.error('Une erreur est survenue lors du démuting :', error);

                        message.reply('une erreur est survenue lors du démuting.');

                    });

            }, duration * 3600000); // Convertit les heures en millisecondes

        })

        .catch(error => {

            console.error('Une erreur est survenue lors du muting :', error);

            message.reply('une erreur est survenue lors du muting.');

        });

}

