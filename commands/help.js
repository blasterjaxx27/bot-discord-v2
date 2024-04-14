const { MessageEmbed } = require('discord.js');

module.exports = {

    name: 'help',

    description: 'Affiche la liste des commandes disponibles.',

    execute(message, client, prefix) {

        // Crée un message d'embed pour afficher la liste des commandes

        const embed = new MessageEmbed()

            .setColor('#0099ff')

            .setTitle('Liste des Commandes')

            .setDescription('Voici la liste des commandes disponibles :')

            .addField(`+ban [@membre] [raison]`, 'banni un membre du serveur') 


               
                      

            .addField(`+mute [@membre] [temps en h] `, 'reduit un membre au silence .')

            .addField(`+warn [@membre] [raison]`, 'avertis un membre')
        
        
            .addField(`+avatar [@membre]`, 'affiche la pp de quelqu\'un')
        
            .addField(`+blague`, 'raconte une blague')
        
            .addField(`+config`, 'configure le système antiraid etc...')
        
            
            .addField(`+dm [@membre]`, 'envoyer un message en dm a quelqu\'un')
        
            .addField(`+fake-nitro`, 'envoie un faux nitro')
        
            .addField(`+lock`, 'verrouille un salon')
        
            .addField(`+unlock`, 'deverouille un salon verrouillé')
        
            .addField(`+ping`, 'affiche la latence du bot')
        
            .addField(`+support`, 'envoie le lien d\'invitation du serveur de support du bot')
        
            .addField(`+userinfo [@membre]`, 'affiche les informations d\'un membres')
        
            .addField(`+ticket`, 'crée un ticket sur le serveur')
        
            .addField(`+close`, 'ferme un ticket ou supprime un salon')
        
            .addField(`+renew`, 'recrée un salon')
        
            .addField(`+gstart [récompense] [durée en h]`, 'lance un giveaway')
        
            .addField(`+gw-stop [message ID]`, 'arrête un giveaway en cours et annonce le gagnant')
        
           .addField(`+reroll [message ID]`, 'permet de relancer un giveaway')
           
           .addField(`+clear [nombre]`, 'permet de supprimer un nombre spécifique de messages dans le salon')
        
           .addField(`+embed`,'crée un embed personnalisé')
        
              
        
        
        
            
      
        
        





            // Ajoute d'autres commandes avec leur description ici

            .setTimestamp();

        // Envoie le message d'embed dans le canal où la commande a été utilisée

        message.channel.send({ embeds: [embed] });

    },

};

