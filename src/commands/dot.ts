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
            .setDescription(`${metadata.description}`)
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
                    value: dotenvMetadata.version
                }
            ])
            .setFooter({
                text: `Version - ${metadata.version}`
            })
            .setAuthor({
                name: metadata.author,
                iconURL: `https://github.com/${metadata.author.toLowerCase()}.png`,
                url: `https://${metadata.author.toLowerCase()}.github.io/`
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};
