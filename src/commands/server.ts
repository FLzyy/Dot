import {
    SlashCommandBuilder,
    EmbedBuilder,
    CommandInteraction
} from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Returns Server Info.'),
    async execute(interaction: CommandInteraction) {
        const embed = new EmbedBuilder();

        if (interaction.guild) {
            embed.setTitle(interaction.guild.name);
            embed.setThumbnail(interaction.guild.iconURL());
            embed.addFields([
                {
                    name: 'Members',
                    value: interaction.guild.memberCount.toString()
                },
                {
                    name: 'Owner',
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    value: interaction.client.users.cache.get(
                        interaction.guild.ownerId
                    )!.tag
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
            ]);
        }

        await interaction.reply({
            embeds: [embed]
        });
    }
};
