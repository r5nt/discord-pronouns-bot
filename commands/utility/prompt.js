import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    blockQuote,
    bold,
    italic,
    PermissionFlagsBits,
    SlashCommandBuilder
} from 'discord.js';

import { defaultPronouns } from '../../lib/pronouns.js';

const cooldown = 5;

const data = new SlashCommandBuilder()
    .setName('prompt')
    .setDescription('Create a pronoun selection prompt')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

const execute = async (interaction) => {
    const generateButtons = ({ buttons }) => buttons.map(({ id, style = 'Primary' }) => {
        return new ButtonBuilder()
            .setCustomId(id)
            .setLabel(id)
            .setStyle(ButtonStyle[style]);
    });

    const primaryButtons = global.pronouns?.primary || defaultPronouns.primary;
    const secondaryButtons = global.pronouns?.secondary || defaultPronouns.secondary;

    const row1 = new ActionRowBuilder()
        .addComponents(...generateButtons({ buttons: primaryButtons }));

    const row2 = new ActionRowBuilder()
        .addComponents(...generateButtons({ buttons: secondaryButtons }));

    const textContent = blockQuote(`
    :wave: ${bold('Hey there! What are your pronouns?')}
    
    ${italic('Use the buttons below to select what pronouns you\'d like us to display for you.')}`);

    await interaction.reply({
        content: textContent,
        components: [ row1, row2 ]
    });
};

export {
    cooldown,
	data,
	execute
};