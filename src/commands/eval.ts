import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    EmbedBuilder,
    SlashCommandBuilder,
} from 'discord.js';
import { inspect } from 'util';
import { VM } from 'vm2';

let logs = '';

const log = (type: unknown, args: unknown[]) => {
    logs += `[${type}] ${args.map((x: unknown) => inspect(x)).join(' ')}\n`;
};

export const command = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Runs Javascript and returns output.')
        .addStringOption((option) =>
            option
                .setName('code')
                .setDescription('The code that is ran.')
                .setRequired(true)
        ),
    async execute(interaction: CommandInteraction) {
        const embed = new EmbedBuilder();
        const options = interaction.options as CommandInteractionOptionResolver;
        const codeOption = options.getString('code', true);

        const vm = new VM({
            sandbox: {
                timeout: 5000,
                allowAsync: false,
                console: {
                    log: (...args: unknown[]) => log('LOG', args),
                    warn: (...args: unknown[]) => log('WARN', args),
                    error: (...args: unknown[]) => log('ERROR', args),
                    info: (...args: unknown[]) => log('INFO', args),
                },
            },
        });

        try {
            vm.run(codeOption);

            embed.setTitle('CONSOLE:');
            embed.setDescription(`\`\`\`${logs}\`\`\``);
        } catch (error) {
            embed.setTitle('ERROR:');
            embed.setDescription(
                `There was an error running your code:\n \`\`\`${error}\`\`\``
            );
        }
        logs = '';
        await interaction.reply({
            embeds: [embed],
        });
    },
};
