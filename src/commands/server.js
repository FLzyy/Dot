import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export let command = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Returns Server Info.'),
    async execute(interaction) {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(interaction.guild.name)
                    .setThumbnail(interaction.guild.iconURL())
                    .addFields([
                        {
                            name: 'Members',
                            value: interaction.guild.memberCount.toString()
                        },
                        {
                            name: 'Owner',
                            value: interaction.client.users.cache.get(
                                interaction.guild.ownerId
                            ).tag
                        },
                        {
                            name: 'Partnered Status',
                            value: interaction.guild.partnered.toString()
                        },
                        {
                            name: 'Verified Status',
                            value: interaction.guild.verified.toString()
                        },
                        {
                            name: 'Creation Date',
                            value: interaction.guild.createdAt.toString()
                        },
                        {
                            name: 'Id',
                            value: interaction.guild.id.toString()
                        }
                    ])
            ]
        });
    }
};
