import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    SlashCommandBuilder,
} from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('formatn')
        .setDescription('Formats a number.')
        .addIntegerOption((option) =>
            option
                .setName('number')
                .setDescription('The number that will be formatted')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('notation')
                .setDescription('Type of notation to use.')
                .setChoices(
                    { name: 'Standard', value: 'standard' },
                    { name: 'Scientific', value: 'scientific' },
                    { name: 'Engineering', value: 'engineering' },
                    { name: 'Compact', value: 'compact' }
                )
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        const options = interaction.options as CommandInteractionOptionResolver;
        const notationOption = options.getString('notation', true);
        const numberOption = options.getInteger('number', true);

        const formatter = Intl.NumberFormat('en', {
            notation: notationOption as
                | 'standard'
                | 'scientific'
                | 'engineering'
                | 'compact',
        });

        await interaction.reply(formatter.format(numberOption));
    },
};
