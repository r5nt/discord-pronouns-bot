import { Events } from 'discord.js';

const name = Events.ClientReady;
const shouldRunOnce = true;
const execute = (client) => console.log(`Ready! Logged in as ${client.user.tag}`);

export {
	name,
	shouldRunOnce as once,
    execute
};