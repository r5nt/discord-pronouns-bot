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

import { defaultPronouns, pronounsGlobalState } from '../../lib/pronouns.js';

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

    const generateButtonRows = ({ buttons }) => {
        const maxNumRows = 3;
        const maxNumButtonsPerRow = 5;
        const maxTotalButtons = maxNumRows * maxNumButtonsPerRow;

        const truncatedButtons = buttons.length > maxTotalButtons ? buttons.slice(0, maxTotalButtons) : buttons;
        const numGroups = Math.ceil(truncatedButtons.length / maxNumButtonsPerRow);

        const outputRows = [];

        for (let i = 0; i < numGroups; i++) {
            const buttonsToAdd = truncatedButtons.slice(i * maxNumButtonsPerRow, (i * maxNumButtonsPerRow) + maxNumButtonsPerRow);
            outputRows[i] = new ActionRowBuilder()
                .addComponents(...generateButtons({ buttons: buttonsToAdd }));
        }

        return outputRows;
    };

    const primaryButtons = pronounsGlobalState.primary || defaultPronouns.primary;
    const secondaryButtons = pronounsGlobalState.secondary || defaultPronouns.secondary;

    const secondaryRow = new ActionRowBuilder()
        .addComponents(...generateButtons({ buttons: secondaryButtons }));

    const textContent = blockQuote(`
    :wave: ${bold('Hey there! What are your pronouns?')}
    
    ${italic('Use the buttons below to select what pronouns you\'d like us to display for you.')}`);

    await interaction.reply({
        content: textContent,
        components: [ ...generateButtonRows({ buttons: primaryButtons }), secondaryRow ]
    });
};

export {
    cooldown,
	data,
	execute
};