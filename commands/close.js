module.exports = {

    name: 'close',

    description: 'Supprime le salon dans lequel la commande est exécutée.',

    execute(message) {

        // Vérifie si l'utilisateur a la permission de supprimer des salons

        if (!message.member.permissions.has('MANAGE_CHANNELS')) {

            return message.reply('vous n\'avez pas les permissions nécessaires pour exécuter cette commande.');

        }

        // Supprime le salon

        message.channel.delete()

            .then(deletedChannel => console.log(`Le salon ${deletedChannel.name} a été supprimé.`))

            .catch(error => {

                console.error('Erreur lors de la suppression du salon :', error);

                message.reply('une erreur est survenue lors de la suppression du salon.');

            });

    },

};

