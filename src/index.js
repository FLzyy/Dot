import * as dotenv from "dotenv"
dotenv.config()
const token = process.env.DISCORD_TOKEN

import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = join(__dirname, "commands")
const commandFiles = await readdir(commandsPath);
commandFiles.filter(file => file.endsWith('.js'));

const length = commandFiles.length;
for (let i = 0; i < length; i++) {
    const filePath = join(commandsPath, commandFiles[i])
    const { command } = await import(filePath)

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.error(`Invalid Command: ${commandFiles[i]}`)
    }

    
}
 
client.once(Events.ClientReady, c => {
	console.log(`${c.user.tag} is awake!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})


client.login(token);