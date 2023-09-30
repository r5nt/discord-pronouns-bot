import { SlashCommandBuilder } from 'discord.js';

const cooldown = 5;

const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

const execute = async (interaction) => await interaction.reply('Pong');

export {
    cooldown,
	data,
	execute
};