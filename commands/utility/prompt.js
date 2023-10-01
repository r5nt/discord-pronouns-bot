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

// Response logic
const generateButtons = ({ buttons }) => buttons.map(({ id, style }) => {
    return new ButtonBuilder()
        .setCustomId(id)
        .setLabel(id)
        .setStyle(ButtonStyle[style]);
});

const primaryButtons = [
    {
        id: 'They/Them',
        style: 'Primary'
    },
    {
        id: 'She/Her',
        style: 'Primary'
    },
    {
        id: 'He/Him',
        style: 'Primary'
    }
];

const secondaryButtons = [
    {
        id: 'Any',
        style: 'Secondary'
    },
    {
        id: 'Ask Me',
        style: 'Secondary'
    }
];

const row1 = new ActionRowBuilder()
    .addComponents(...generateButtons({ buttons: primaryButtons }));

const row2 = new ActionRowBuilder()
    .addComponents(...generateButtons({ buttons: secondaryButtons }));

const textContent = blockQuote(`
:wave: ${bold('Hey there! What are your pronouns?')}

${italic('Use the buttons below to select what pronouns you\'d like us to display for you.')}
`);

// Exports
const cooldown = 5;

const data = new SlashCommandBuilder()
    .setName('prompt')
    .setDescription('Create a pronoun selection prompt')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

const execute = async (interaction) => {
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