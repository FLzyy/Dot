import { Events } from 'discord.js';
import logger from '../utils/logger.js';

export const event = {
    name: Events.Debug,
    once: true,
    execute: (message: string) => {
        logger.debug(message);
    }
};
