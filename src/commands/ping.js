import { SlashCommandBuilder } from 'discord.js';

export let command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns ping.'),
    async execute(interaction) {
        await interaction.reply(
            `🏓 Pong! ${Date.now() - interaction.createdTimestamp}ms`
        );
    }
};
