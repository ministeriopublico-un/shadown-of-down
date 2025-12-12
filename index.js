const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();
const express = require('express');

// --- CÓDIGO DE EXPRESS PARA MANTENER EL BOT ACTIVO (24/7) ---
const app = express();
app.get('/', (req, res) => res.send('Bot de Fruit Battlegrounds activo'));
// El puerto 3000 es el estándar, crucial para el alojamiento gratuito
app.listen(3000, () => console.log('Servidor web activo en puerto 3000'));
// --------------------------------------------------------

// --- CONFIGURACIÓN DEL CLIENTE ---
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.on('ready', () => {
	console.log(`Bot de Fruit Battlegrounds conectado como ${client.user.tag}`);
});

// --- MANEJO DE INTERACCIONES (COMANDO /buster-call) ---
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
    
	if (interaction.commandName === 'buster-call') {
        
        const opts = interaction.options;

        const mundo = opts.getString('mundo');
        const lugar = opts.getString('lugar-especifico');
        const enemigos = opts.getString('enemigos'); 
        const tipoBatalla = opts.getString('tipo-de-batalla');
        const hayAliados = opts.getBoolean('hay-aliados');
        const nombresAliados = opts.getString('nombres-aliados') || '';
        const rolBusterCall = opts.getString('rol-buster-call');

        let colorAlerta = 0xFF4500; 
        let tituloAlerta = '¡ALERTA ROJA! SOLICITUD DE ASISTENCIA INMEDIATA';
        
        if (tipoBatalla === 'CLAN_WAR') {
            colorAlerta = 0x8B0000; 
            tituloAlerta = 'WAR';
        } else if (tipoBatalla === 'TEAMERS') {
            colorAlerta = 0xFFA500; 
            tituloAlerta = '¡GRUPO DE TEAMERS! REFUERZOS NECESARIOS';
        }

        let fieldAliados;
        if (hayAliados) {
            const nombres = nombresAliados.trim() !== '' ? nombresAliados : `Sí, pero nombres no especificados.`;
            fieldAliados = `**¡SÍ!** \n> ${nombres}`;
        } else {
            fieldAliados = `**¡NO!** \n> ${interaction.user.username} está solo. ¡Necesita refuerzos!`;
        }

        const busterEmbed = new EmbedBuilder()
            .setColor(colorAlerta)
            .setTitle(tituloAlerta)
            .setDescription(`El miembro **${interaction.user.username}** ha emitido un código **Buster Call** y necesita apoyo urgente en Fruit Battlegrounds.`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 64 }))
            .addFields(
                { name: 'I. MUNDO DE BATALLA', value: mundo, inline: true },
                { name: 'II. TIPO DE AMENAZA', value: tipoBatalla.replace('_', ' '), inline: true },
                { name: 'III. FUNCIONARIO EMISOR', value: `${interaction.user}`, inline: true },
                { name: 'IV. UBICACIÓN ESPECÍFICA', value: `\`${lugar}\``, inline: false },
                { name: 'V. ENEMIGOS (JUGADORES/CLAN)', value: `\`${enemigos}\``, inline: false },
                { name: 'VI. ALIADOS EN LA ZONA', value: fieldAliados, inline: false }
            )
            .setFooter({ text: 'Acuda al llamado inmediatamente. ¡Por la gloria del clan!' })
            .setTimestamp();
        
        await interaction.reply({
            content: `${rolBusterCall} **¡Buster Call Activo!** Necesitamos refuerzos en **${mundo}** (${lugar}).`,
            embeds: [busterEmbed]
        });
    }
});

client.login(process.env.TOKEN);
