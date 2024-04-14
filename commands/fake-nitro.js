const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'fake-nitro',

    description: 'Génère un lien de faux Nitro.',

    execute(message) {

        const code = generateFakeCode(); // Fonction pour générer un code aléatoire

        const embed = new MessageEmbed()

            .setColor('#0099ff')

            .setTitle('Lien Nitro Faux')

            .setDescription(`[Clique ici](https://discord.gift/${code}) pour obtenir ton faux Nitro !`)

            .setFooter('Amuse-toi bien !');

        message.channel.send({ embeds: [embed] });

    },

};

function generateFakeCode() {

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const codeLength = 16;

    let code = '';

    for (let i = 0; i < codeLength; i++) {

        const randomIndex = Math.floor(Math.random() * characters.length);

        code += characters[randomIndex];

    }

    return code;

}

