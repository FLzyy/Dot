/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    EmbedBuilder,
    SlashCommandBuilder
} from 'discord.js';

import { ESLint } from 'eslint';

export const command = {
    data: new SlashCommandBuilder()
        .setName('lint')
        .setDescription('Lints your code using ESLint.')
        .addStringOption((option) =>
            option
                .setName('code')
                .setDescription('The code to lint')
                .setRequired(true)
                .setMaxLength(1000)
                .setMinLength(4)
        )
        .addBooleanOption((option) =>
            option
                .setName('show-code')
                .setDescription(
                    'Whether or not the code is shown in the response.'
                )
        ),
    async execute(interaction: CommandInteraction) {
        const embed = new EmbedBuilder();
        const options = interaction.options as CommandInteractionOptionResolver;
        const prettified = options
            .getString('code', true)
            .replaceAll(';', '\n');
        const eslint = new ESLint();
        const results = await eslint.lintText(prettified);
        const formatter = await eslint.loadFormatter('unix');
        const resultText = formatter.format(results);
        const title = resultText.toString().split(/\n\n/)[1] ?? '0 problems';
        const color = title === '0 problems' ? 'Green' : 'Red';
        const showCode = options.getBoolean('show-code') ?? false;

        embed.setTitle(title);
        embed.setColor(color);
        if (showCode === true) {
            embed.setDescription(`\`\`\`${prettified}\`\`\``);
        }
        if (title !== '0 problems') {
            const errors = resultText.toString().split(/\n\n/)[0].split(/\n/);

            const length = errors.length;
            for (let i = 0; i < length; i++) {
                const fixed = errors[i].replace('<text>:', '');
                const split1 = fixed.split(': ');
                const split2 = split1[1].split('.');

                embed.addFields({
                    name: split1[0],
                    value: `
                    **${split2[0]}** - ${split2[1]}
                    `
                });
            }
        }

        await interaction.reply({
            embeds: [embed]
        });
    }
};
