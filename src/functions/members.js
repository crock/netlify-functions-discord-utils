import { Client } from 'discord.js'

exports.handler = async function(event, context) {
  const bot = new Client()
  await bot.login(process.env.BOT_TOKEN)

  const members = []
  bot.guilds.get(process.env.GUILD_ID).members.cache.map(member => {
    if (member.user.bot) return
    members.push({
      id: member.user.id,
      avatarUrl: member.user.displayAvatarUrl(),
      username: member.user.tag,
      joinDate: member.joinedAt,
      nickname: member.nickname,
    })
  })

  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ members }),
  }
}
