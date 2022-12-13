import { SlashCommandBuilder } from 'discord.js';

export let command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply(
            `🏓 Pong! ${Date.now() - interaction.createdTimestamp}ms`
        );
    }
};
