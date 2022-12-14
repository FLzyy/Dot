import {
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';

import metadata from '../../package.json';
import discordMetadata from 'discord.js/package.json';
import typescriptMetadata from 'typescript/package.json';
import dotenvMetadata from 'dotenv/package.json';

export const command = {
    data: new SlashCommandBuilder()
        .setName('dot')
        .setDescription('Returns information about this Bot.'),
    async execute(interaction: CommandInteraction) {
        const embed = new EmbedBuilder();

        embed
            .setTitle(interaction.client.user.tag)
            .setDescription(
                `**${interaction.client.user.username}** is in **${
                    interaction.client.guilds.cache.size
                }** ${
                    interaction.client.guilds.cache.size > 1
                        ? 'servers'
                        : 'server'
                }!ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\nㅤ`
            )
            .setThumbnail(interaction.client.user.avatarURL())
            .setURL(metadata.homepage)
            .setFields([
                {
                    name: 'NodeJS:',
                    value: process.version
                },
                {
                    name: 'Discord.JS:',
                    value: discordMetadata.version
                },
                {
                    name: 'Typescript:',
                    value: typescriptMetadata.version
                },
                {
                    name: 'Dotenv:',
                    value: `${dotenvMetadata.version}\nㅤ`
                }
            ])
            .setFooter({
                text: `Version - ${metadata.version}`
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};
