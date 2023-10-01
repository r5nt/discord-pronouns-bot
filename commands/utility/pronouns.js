/* eslint-disable no-case-declarations */
import { SlashCommandBuilder } from 'discord.js';

const cooldown = 5;

const data = new SlashCommandBuilder()
    .setName('pronouns')
    .setDescription('Pronoun option settings')
    .addSubcommand((subcommand) =>
        subcommand
            .setName('add')
            .setDescription('Add a new pronoun option')
            .addStringOption((option) =>
                option
                    .setName('pronoun')
                    .setDescription('The pronoun to add')
            )
    ).addSubcommand((subcommand) =>
        subcommand
            .setName('remove')
            .setDescription('Remove an existing pronoun option')
            .addStringOption((option) =>
                option
                    .setName('pronoun')
                    .setDescription('The pronoun to remove')
            )
    );

const execute = async (interaction) => {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
        case 'add':
            const pronounToAdd = interaction.options.getString('pronoun');
            console.log({ pronounToAdd });
            break;
        case 'remove':
            const pronounToRemove = interaction.options.getString('pronoun');
            console.log({ pronounToRemove });
            break;
        case 'reset':
            console.log('Reset!');
            break;
        default:
            console.log('idk');
    }

    await interaction.reply({
        content: 'Pronoun request handled',
        ephemeral: true
    });
};

export {
    cooldown,
	data,
	execute
};