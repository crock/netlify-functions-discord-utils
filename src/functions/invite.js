import { Client } from 'discord.js'

exports.handler = async function(event, context) {
  const bot = new Client()
  await bot.login(process.env.BOT_TOKEN)

  const guild = bot.guilds.get(process.env.GUILD_ID)
  const channel = guild.channels.get(process.env.CHANNEL_ID)

  const invite = await channel.createInvite(
    {
      temporary: false,
      maxUses: 1,
      unique: true,
    },
    'Generated an invite for a new user!'
  )

  return event.queryStringParameters.redirect
    ? {
        statusCode: 301,
        headers: {
          Location: invite.url,
          'Cache-Control': 'no-cache',
        },
      }
    : {
        statusCode: 200,
        headers: {
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ inviteCode: invite.code }),
      }
}
