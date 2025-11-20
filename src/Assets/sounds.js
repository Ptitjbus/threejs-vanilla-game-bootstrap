// {
//     name: '',           // Identifiant unique du son
//     type: '',           // Type de son (music, voice, effect, ambient)
//     path: '',           // Chemin vers le fichier audio
//     options: {          // Options de lecture par défaut
//         loop: false,    // Si le son doit jouer en boucle
//         volume: 1.0,    // Volume par défaut (0.0 à 1.0)
//         spatial: false, // Si le son doit être spatialisé
//         maxDistance: 10 // Distance maximale d'audition pour les sons spatiaux
//     },
//     license: '',        // Licence du son
//     author: '',         // Auteur du son
//     url: ''            // URL source du son
// }

export default [
    // Musiques
    {
        name: 'end',
        type: 'music',
        path: '/audio/musics/end.mp3',
        options: {
            loop: true,
            volume: 1,
        },
        license: '',
        author: '',
        url: '',
    },
    // Sfx
    {
        name: 'spot_boat',
        type: 'sfx',
        path: 'audio/sfx/spots/turn_on.mp3',
        options: {
            loop: false,
            volume: 10.0,
        },
        license: '',
        author: '',
        url: '',
    },
    {
        name: 'door_open',
        type: 'sfx',
        path: 'audio/sfx/doors/open.mp3',
        options: {
            loop: false,
            volume: 1,
        },
        license: '',
        author: '',
        url: '',
    },
    {
        name: 'door_close',
        type: 'sfx',
        path: '/audio/sfx/doors/close.mp3',
        options: {
            loop: false,
            volume: 1,
        },
        license: '',
        author: '',
        url: '',
    },
]
