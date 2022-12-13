import { Client, Events } from 'discord.js';
import {} from 'discord-api-types/v10';

export const event = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        //@ts-expect-error: This would normally work but typescript says it might be undefined.
        console.log(`🟢 ${client.user.tag} is up!`);
    }
};
