const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require('dotenv').config();

const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

const commands = [
    {
        name: 'buster-call',
        description: '¡EMERGENCIA! Pide asistencia inmediata al clan en Fruit Battlegrounds.',
        options: [
            {
                name: 'mundo',
                description: 'El mundo de Fruit Battlegrounds donde te encuentras.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    { name: 'Dressrosa', value: 'DRESSROSA' },
                    { name: 'Whole Cake Island', value: 'WHOLE_CAKE' },
                    { name: 'Wano Country', value: 'WANO' },
                ],
            },
            {
                name: 'lugar-especifico',
                description: 'Lugar exacto (Ej: Fuente, Coliseo, Montaña de Marco).',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'enemigos',
                description: 'Nombres de los enemigos (jugadores o clan(es) completo(s)).',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'tipo-de-batalla',
                description: 'Define si es una War o si están siendo cazados por Teamers.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    { name: 'War (Guerra de Clanes)', value: 'CLAN_WAR' },
                    { name: 'Teamers (Cazadores)', value: 'TEAMERS' },
                ],
            },
            {
                name: 'hay-aliados',
                description: '¿Hay otros aliados de tu clan contigo actualmente?',
                type: ApplicationCommandOptionType.Boolean, 
                required: true,
            },
            {
                name: 'nombres-aliados',
                description: 'Si hay aliados, pon sus nombres (separados por coma).',
                type: ApplicationCommandOptionType.String,
                required: false, 
            },
            {
                name: 'rol-buster-call',
                description: 'El ping del rol de ayuda Buster Call (@rol).',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
	try {
		console.log(`Iniciando el despliegue de ${commands.length} comando(s).`);

		const data = await rest.put(
			Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
			{ body: commands },
		);

		console.log(`Despliegue exitoso. Se cargaron ${data.length} comando(s).`);
	} catch (error) {
		console.error(error);
	}
})();
