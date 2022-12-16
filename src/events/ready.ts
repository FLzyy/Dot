import { Client, Events } from 'discord.js';
import logger from '../utils/logger.js';

export const event = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        //@ts-expect-error: This would normally work but typescript says it might be undefined.
        logger.info(`${client.user.tag} is online.`);
    }
};
