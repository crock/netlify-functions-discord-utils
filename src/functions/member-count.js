import { Client } from 'discord.js'

exports.handler = async function(event, context) {
  const bot = new Client()
  await bot.login(process.env.BOT_TOKEN)

  const memberCount = bot.guilds.get(process.env.GUILD_ID).memberCount

  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ memberCount }),
  }
}
