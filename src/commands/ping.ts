import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Returns ping.'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply(
            `🏓 Pong! ${Date.now() - interaction.createdTimestamp}ms`
        );
    }
};
