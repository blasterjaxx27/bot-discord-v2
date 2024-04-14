// clear.js

module.exports = {

    name: 'clear',

    description: 'Supprime un nombre spécifié de messages.',

    execute(message, args) {

        // Vérifie si l'utilisateur a la permission de gérer les messages

        if (!message.member.permissions.has('MANAGE_MESSAGES')) {

            return message.reply("Vous n'avez pas la permission de supprimer des messages.");

        }

        // Vérifie si l'argument du nombre de messages à supprimer est fourni

        const amount = parseInt(args[0]);

        if (isNaN(amount)) {

            return message.reply('Veuillez spécifier un nombre valide de messages à supprimer.');

        } else if (amount <= 1 || amount > 100) {

            return message.reply('Le nombre de messages à supprimer doit être compris entre 1 et 100.');

        }

        // Supprime les messages

        message.channel.bulkDelete(amount, true)

            .then(messages => message.channel.send(`Suppression de ${messages.size} messages.`))

            .catch(error => {

                console.error(error);

                message.channel.send('Une erreur est survenue lors de la suppression des messages.');

            });

    },

};

