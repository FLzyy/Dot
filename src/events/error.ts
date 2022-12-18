import { Events } from 'discord.js';
import logger from '../utils/logger.js';

export const event = {
    name: Events.Error,
    once: true,
    execute: (message: string) => {
        logger.error(message);
    }
};
