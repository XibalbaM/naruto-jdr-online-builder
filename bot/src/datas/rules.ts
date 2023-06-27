export default {
    "Types d'actions": [
        "**Action simple** : Une action sans jet de dés, simple et facile.",
        "**Action complexe** : À l’initiative d’un personnage, c’est son action principale du tour.",
        "**Action retardée** : Au sacrifice de son action complexe, un personnage peut maintenant choisir l’initiative de son action dans le tour (action temporisée) ou gagner une nouvelle action jouable à tout moment aux tours suivants (action retardée).",
        "**Action de lignée** : Usage d’un pouvoir actif de lignée d’un personnage, à l’initiative de son choix, mais limité par le nombre d’utilisations possibles.",
        "**Action d’interception** : Un ou plusieurs coups rapides, sans jet de dés ni initiative, s’annulant s’ils sont joués les uns contre les autres, offrant bonus ou malus."
    ],
    "Distances, zones et durées": {
        "Distances": [
            "5m",
            "10m",
            "25m",
            "50m",
            "75m",
            "100m",
            "150m",
            "250m",
            "500m",
            "1km",
            "3km",
            "5km",
            "10km",
            "15km",
            "25km",
            "50km",
            "75km",
            "100km",
            "200km",
            "500km",
        ],
        "Zones": [
            {
                "size": "1m",
                "parade": 0,
                "esquive": 0,
            },
            {
                "size": "2m",
                "parade": 0,
                "esquive": 0,
            },
            {
                "size": "4m",
                "parade": -1,
                "esquive": 0,
            },
            {
                "size": "7m",
                "parade": -2,
                "esquive": 0,
            },
            {
                "size": "10m",
                "parade": -3,
                "esquive": 0,
            },
            {
                "size": "15m",
                "parade": -4,
                "esquive": -1,
            },
            {
                "size": "20m",
                "parade": -5,
                "esquive": -2,
            },
            {
                "size": "25m",
                "parade": -6,
                "esquive": -3,
            },
            {
                "size": "35m",
                "parade": -7,
                "esquive": -4,
            },
            {
                "size": "50m",
                "parade": -8,
                "esquive": -5,
            },
            {
                "size": "75m",
                "parade": -9,
                "esquive": -6,
            },
            {
                "size": "100m",
                "parade": -10,
                "esquive": -7,
            },
            {
                "size": "150m",
                "parade": -10,
                "esquive": -8,
            },
            {
                "size": "200m",
                "parade": -10,
                "esquive": -9,
            },
            {
                "size": "500m",
                "parade": -10,
                "esquive": -10,
            },
            {
                "size": "750m",
                "parade": -10,
                "esquive": -10,
            },
            {
                "size": "1km",
                "parade": -10,
                "esquive": -10,
            },
            {
                "size": "3km",
                "parade": -10,
                "esquive": -10,
            },
            {
                "size": "5km",
                "parade": -10,
                "esquive": -10,
            },
            {
                "size": "10km",
                "parade": -10,
                "esquive": -10,
            }
        ],
        "Durées": [
            "1h",
            "6h",
            "12h",
            "1 jour",
            "3 jours",
            "1 semaine",
            "2 semaines",
            "1 mois",
            "6 mois",
            "1 an",
            "6 ans",
            "10 ans",
            "60 ans",
            "100 ans",
            "200 ans",
        ]
    },
    "Portées, durées et cibles": {
        "Portées": {
            "description": "Le type de connexion nécessaire entre la source et sa cible.",
            "values": [
                "Connexion",
                "Externe",
                "Perception",
                "Personnelle",
                "Son, Toucher ou Yeux"
            ]
        },
        "Durées": {
            "description": "La temporalité et ses modalités d’entretien.",
            "values": [
                "Concentration",
                "Instantané",
                "Momentané",
                "Permanent",
                "Rituel, Retardement"
            ]
        },
        "Cibles": {
            "description": "Ce qui est affecté.",
            "values": [
                "Aire d’effet",
                "Individuelle",
                "Génétique",
                "Groupe",
                "Spécifique"
            ]
        }
    }
}