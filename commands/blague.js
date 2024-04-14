const jokes = [

    "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent toujours dans le bateau.",

    "Quel est le comble pour un électricien ? De ne pas être au courant.",

    "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent toujours dans le bateau.",

    "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent toujours dans le bateau.",

    // Ajoute d'autres blagues ici

];

module.exports = {

    name: 'blague',

    description: 'Affiche une blague aléatoire.',

    execute(message) {

        // Choix aléatoire d'une blague dans le tableau

        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        // Envoie la blague dans le canal

        message.channel.send(randomJoke);

    },

};

