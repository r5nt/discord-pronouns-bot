import { Events } from 'discord.js';

import { defaultPronouns, pronounsGlobalState } from '../lib/pronouns.js';

const name = Events.ClientReady;

const shouldRunOnce = true;

const execute = (client) => {
	pronounsGlobalState.primary = [ ...defaultPronouns.primary ];
	pronounsGlobalState.secondary = [ ...defaultPronouns.secondary ];

	console.log(`Ready! Logged in as ${client.user.tag}`);
};

export {
	name,
	shouldRunOnce as once,
    execute
};