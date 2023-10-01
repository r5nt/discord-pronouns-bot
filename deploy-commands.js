import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

const rest = new REST().setToken(token);

const generateCommandsArray = async ({ commandFolders, foldersPath }) => {
    const commands = [];
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = pathToFileURL(path.join(commandsPath, file));
            const command = await import(filePath);

            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    return commands;
};

(async () => {
    try {
        const foldersPath = path.join(path.resolve(), 'commands');
        const commandFolders = fs.readdirSync(foldersPath);

        const commands = await generateCommandsArray({ commandFolders, foldersPath });

        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(Routes.applicationCommands(clientId), {
            body: commands
        });

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
