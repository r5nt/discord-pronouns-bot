import { Client, Collection, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const token = process.env.DISCORD_TOKEN;

const generateClientCommandsCollection = async () => {
    const commands = new Collection();

    const foldersPath = path.join(path.resolve(), 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = pathToFileURL(path.join(commandsPath, file));
            const command = await import(filePath);

            if ('data' in command && 'execute' in command) {
                commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    return commands;
};

const populateClientEvents = async (client) => {
    const eventsPath = path.join(path.resolve(), 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
    
    for (const file of eventFiles) {
        const filePath = pathToFileURL(path.join(eventsPath, file));
        const event = await import(filePath);
    
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};

const client = new Client({ intents: [ GatewayIntentBits.Guilds ] });
client.commands = await generateClientCommandsCollection();
client.cooldowns = new Collection();
await populateClientEvents(client);

client.login(token);
