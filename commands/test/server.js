import { SlashCommandBuilder } from 'discord.js';

const cooldown = 5;

const data = new SlashCommandBuilder()
    .setName('server')
    .setDescription('Provides information about the server.');

// interaction.guild is the object representing the Guild in which the command was run
const execute = async (interaction) => await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);

export {
    cooldown,
	data,
	execute
};