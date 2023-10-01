import { Collection, Colors, Events } from 'discord.js';

const name = Events.InteractionCreate;

const execute = async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const { client } = interaction;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        const { cooldowns } = client;

        if (!cooldowns.has(command.data.name)) {
            cooldowns.set(command.data.name, new Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.data.name);
        const defaultCooldownDuration = 3;
        const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const expiredTimestamp = Math.round(expirationTime / 1000);
                return interaction.reply({
                    content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
                    ephemeral: true
                });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    } else if (interaction.isButton()) {
        await interaction.deferReply({ ephemeral: true });
        const { customId, guild, member, user } = interaction;

        const foundRole = guild.roles.cache.find((role) => role.name === customId);

        if (!foundRole) {
            const newRole = await guild.roles.create({
                color: Colors.Blue,
                name: customId,
                permissions: '0',
                reason: `created by bonnie-bot for ${user.username}`
            });
            member.roles.add(newRole);
        } else {
            member.roles.add(foundRole);
        }

        await interaction.followUp({
            content: 'Your pronoun selection has been added to your profile',
            ephemeral: true
        });
    }
};

export {
    name,
    execute
};