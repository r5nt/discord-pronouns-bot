import { Events } from 'discord.js';

import { defaultPronouns } from '../lib/pronouns.js';

const name = Events.ClientReady;

const shouldRunOnce = true;

const execute = (client) => {
	global.pronouns = {
		primary: [ ...defaultPronouns.primary ],
		secondary: [ ...defaultPronouns.secondary ]
	};

	console.log(`Ready! Logged in as ${client.user.tag}`);
};

export {
	name,
	shouldRunOnce as once,
    execute
};