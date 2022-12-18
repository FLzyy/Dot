import { Events } from 'discord.js';
import logger from '../utils/logger.js';

export const event = {
    name: Events.Warn,
    once: true,
    execute: (message: string) => {
        logger.warning(message);
    }
};
