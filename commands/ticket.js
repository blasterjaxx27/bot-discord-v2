const { MessageActionRow, MessageButton, MessageEmbed, Permissions } = require('discord.js');

module.exports = {

    name: 'ticket',

    description: 'Crée un système de tickets avec plusieurs options.',

    async execute(message) {

        const embed = new MessageEmbed()

            .setColor('#0099ff')

            .setTitle('Système de Tickets')

            .setDescription('Cliquez sur un bouton ci-dessous pour ouvrir un ticket correspondant à votre besoin.');

        const row = new MessageActionRow()

            .addComponents(

                new MessageButton()

                    .setCustomId('aide')

                    .setLabel('Aide')

                    .setStyle('PRIMARY'),

                new MessageButton()

                    .setCustomId('recrutement')

                    .setLabel('Recrutement')

                    .setStyle('PRIMARY'),

                new MessageButton()

                    .setCustomId('partenariat')

                    .setLabel('Partenariat')

                    .setStyle('PRIMARY'),

                new MessageButton()

                    .setCustomId('signalement')

                    .setLabel('Signalement')

                    .setStyle('DANGER')

            );

        const msg = await message.channel.send({ embeds: [embed], components: [row] });

        const filter = i => i.isButton();

        const collector = message.channel.createMessageComponentCollector({ filter, componentType: 'BUTTON' }); // Maintenant sans limite de temps

        collector.on('collect', async i => {

            const ticketName = `${i.customId}-${i.user.discriminator}`;

            // Vérifiez si le salon existe déjà pour l'utilisateur

            const existingChannel = message.guild.channels.cache.find(c => c.name === ticketName && c.type === 'GUILD_TEXT');

            if (existingChannel) {

                await i.reply({ content: 'Vous avez déjà un ticket ouvert.', ephemeral: true });

                return;

            }

            // Créer un nouveau salon de ticket

            message.guild.channels.create(ticketName, {

                type: 'GUILD_TEXT',

                permissionOverwrites: [

                    {

                        id: message.guild.id,

                        deny: [Permissions.FLAGS.VIEW_CHANNEL],

                    },

                    {

                        id: i.user.id,

                        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.READ_MESSAGE_HISTORY],

                    },

                    {

                        id: message.client.user.id,

                        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.READ_MESSAGE_HISTORY, Permissions.FLAGS.MANAGE_CHANNELS],

                    },

                ],

            }).then(channel => {

                const embed = new MessageEmbed()

                    .setColor('#0099ff')

                    .setTitle(`Ticket: ${i.customId}`)

                    .setDescription(`Merci d'avoir ouvert un ticket! Un membre de notre équipe vous répondra bientôt. Utilisez ce canal pour discuter de votre problème de ${i.customId}.`);

                channel.send({ content: `<@${i.user.id}>`, embeds: [embed] });

                i.reply({ content: `Votre ticket a été créé: ${channel}`, ephemeral: true });

            }).catch(console.error);

        });

        collector.on('end', collected => console.log(`Collected ${collected.size} items`));

    },

};

