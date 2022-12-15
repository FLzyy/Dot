/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    SlashCommandBuilder
} from 'discord.js';

import prettier from 'prettier';

export const command = {
    data: new SlashCommandBuilder()
        .setName('prettify')
        .setDescription('Prettifies your code using Prettier.')
        .addStringOption((option) =>
            option
                .setName('parser')
                .setDescription(
                    'The parser that prettier will use. https://prettier.io/docs/en/options.html#parser'
                )
                .setChoices(
                    { name: 'Babel', value: 'babel' },
                    { name: 'Babel Flow', value: 'babel-flow' },
                    { name: 'Babel Typescript', value: 'babel-ts' },
                    { name: 'Flow', value: 'flow' },
                    { name: 'Typescript', value: 'typescript' },
                    { name: 'Espree', value: 'espree' },
                    { name: 'Meriyah', value: 'meriyah' },
                    { name: 'Acorn', value: 'acorn' },
                    { name: 'CSS', value: 'css' },
                    { name: 'SCSS', value: 'scss' },
                    { name: 'Less', value: 'less' },
                    { name: 'JSON', value: 'json' },
                    { name: 'JSON 5', value: 'json5' },
                    { name: 'JSON Stringify', value: 'json-stringify' },
                    { name: 'GraphQL', value: 'graphql' },
                    { name: 'Markdown', value: 'markdown' },
                    { name: 'Mdx', value: 'mdx' },
                    { name: 'HTML', value: 'html' },
                    { name: 'Vue', value: 'vuew' },
                    { name: 'Angular', value: 'angular' },
                    { name: 'LWC', value: 'lwc' },
                    { name: 'YAML', value: 'yaml' }
                )
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('code')
                .setDescription('The code to prettify')
                .setRequired(true)
                .setMaxLength(1000)
                .setMinLength(4)
        ),
    async execute(interaction: CommandInteraction) {
        const options = interaction.options as CommandInteractionOptionResolver;
        try {
            await interaction.reply(
                `\`\`\`${prettier.format(options.getString('code', true), {
                    semi: true,
                    parser: options.getString('parser', true)
                })}\`\`\``
            );
        } catch (error) {
            await interaction.reply(
                `**An error has occurred with Prettier:** \`\`\`${error}\`\`\``
            );
        }
    }
};
