/* eslint-disable no-case-declarations */
import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

import { defaultPronouns } from '../../lib/pronouns.js';

const MAX_NUM_PRIMARY_PRONOUNS = 15;

const cooldown = 3;

const data = new SlashCommandBuilder()
    .setName('pronouns')
    .setDescription('Pronoun option settings')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
        subcommand
            .setName('add')
            .setDescription('Add a new pronoun option')
            .addStringOption((option) =>
                option
                    .setName('pronoun')
                    .setDescription('The pronoun to add')
                    .setRequired(true)
            )
    ).addSubcommand((subcommand) =>
        subcommand
            .setName('remove')
            .setDescription('Remove an existing pronoun option')
            .addStringOption((option) =>
                option
                    .setName('pronoun')
                    .setDescription('The pronoun to remove')
                    .setRequired(true)
            )
    ).addSubcommand((subcommand) =>
        subcommand
            .setName('reset')
            .setDescription('Removes all non-default pronouns')
);

const execute = async (interaction) => {
    const subcommand = interaction.options.getSubcommand();
    const primaryGlobalPronouns = [ ...global.pronouns.primary ];

    switch (subcommand) {
        case 'add':
            if (primaryGlobalPronouns.length >= MAX_NUM_PRIMARY_PRONOUNS) {
                await interaction.reply({
                    content: 'Pronoun number limit reached. Remove one or tell nick that we need to add more ',
                    ephemeral: true
                });
                return;
            }

            const pronounToAdd = interaction.options.getString('pronoun');

            if (primaryGlobalPronouns.find(({ id }) => id === pronounToAdd)) {
                await interaction.reply({
                    content: 'This pronoun already exists',
                    ephemeral: true
                });
                return;
            }

            global.pronouns.primary = [ ...primaryGlobalPronouns, { id: pronounToAdd } ];
            break;
        case 'remove':
            const pronounToRemove = interaction.options.getString('pronoun');

            if (!primaryGlobalPronouns.find(({ id }) => id === pronounToRemove)) {
                await interaction.reply({
                    content: 'This pronoun doesn\'t exist',
                    ephemeral: true
                });
                return;
            }

            global.pronouns.primary = [ ...primaryGlobalPronouns.filter(({ id }) => id !== pronounToRemove) ];
            break;
        case 'reset':
            global.pronouns = {
                primary: [ ...defaultPronouns.primary ],
                secondary: [ ...defaultPronouns.secondary ]
            };
            break;
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