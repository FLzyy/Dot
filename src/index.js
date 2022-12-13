import * as dotenv from 'dotenv';
dotenv.config();
const token = process.env.DISCORD_TOKEN;

import { ShardingManager } from 'discord.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const manager = new ShardingManager(join(__dirname, 'bot.js'), {
    token: token
});

manager.on('shardCreate', (shard) => console.log(`Launched shard ${shard.id}`));

manager.spawn();
