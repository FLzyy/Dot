import * as dotenv from 'dotenv';
dotenv.config();
const token = process.env.DISCORD_TOKEN;
const guildId = process.env.DEV_GUILD_ID;
const clientId = process.env.CLIENT_ID;

import { REST, Routes } from 'discord.js';
import { readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const commands = [];
const commandsPath = join(__dirname, 'commands');
const devCommandFiles = await readdir(commandsPath);
const filtered = devCommandFiles.filter((file) => file.endsWith('.dev.js'));
console.log(filtered);

const length = filtered.length;
for (let i = 0; i < length; i++) {
    const { command } = await import(join(commandsPath, filtered[i]));
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

if (commands !== []) {
    try {
        console.log(
            `Started registering ${commands.length} application (/) commands.`
        );
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );
        console.log(
            `Successfully registered ${data.length} application (/) commands.`
        );
    } catch (error) {
        console.error(error);
    }
} else {
    console.warn('[WARNING] There are no dev commands');
}
