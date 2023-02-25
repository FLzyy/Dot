/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection } from 'discord.js';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly DISCORD_TOKEN: string;
            readonly CLIENT_ID: string;
        }
    }
}

declare module 'discord.js' {
    export interface Client {
        commands: Collection<unknown, any>;
    }
}
