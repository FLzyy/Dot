/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    CommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    CommandInteractionOptionResolver
} from 'discord.js';
import axios from 'axios';

const isIterable = (obj: any) => {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
};

export const command = {
    data: new SlashCommandBuilder()
        .setName('r-random')
        .setDescription('Returns a random post from a subreddit.')
        .addStringOption((option) =>
            option
                .setName('subreddit')
                .setDescription('Subreddit to pull a random post from.')
                .setRequired(true)
                .setMaxLength(20)
        ),
    async execute(interaction: CommandInteraction) {
        const embed = new EmbedBuilder();

        const options = interaction.options as CommandInteractionOptionResolver;
        const subreddit = options
            .getString('subreddit', true)
            .toLowerCase()
            .replace('r/', '');
        let ephemeral = false;

        try {
            const response = await axios.get(
                `https://www.reddit.com/r/${subreddit}/random/.json`
            );

            if (isIterable(response.data)) {
                const [list] = response.data;
                const [post] = list.data.children;

                embed
                    .setTitle(post.data.title)
                    .setURL(`https://reddit.com${post.data.permalink}`)
                    .setFooter({
                        text: `👍 ${post.data.ups} 💬 ${post.data.num_comments}`
                    });

                if (post.data.url_overridden_by_dest) {
                    if (
                        (post.data.url_overridden_by_dest as string).includes(
                            'i.redd.it'
                        ) ||
                        (post.data.url_overridden_by_dest as string).includes(
                            'imgur'
                        )
                    ) {
                        embed.setImage(post.data.url_overridden_by_dest);
                    } else if (
                        (post.data.url_overridden_by_dest as string).includes(
                            'youtu.be'
                        )
                    ) {
                        embed.setImage(
                            `https://img.youtube.com/vi/${
                                (
                                    post.data.url_overridden_by_dest as string
                                ).split('/')[1]
                            }/maxresdefault.jpg`
                        );
                    }
                }
                if (post.data.selftext !== '') {
                    embed.setDescription(post.data.selftext);
                }
            } else {
                embed.setTitle('Invalid Subreddit');
                embed.setColor('Red');
                ephemeral = true;
            }
        } catch (error) {
            console.error(error);
        }

        await interaction.reply({ embeds: [embed], ephemeral: ephemeral });
    }
};
