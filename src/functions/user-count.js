import axios from 'axios'

exports.handler = async function(event, context) {
  const baseUrl = `https://discordapp.com/api`

  const guild = process.env.GUILD_ID

  const url = `${baseUrl}/guilds/${guild}/members`

  const response = await axios({
    method: 'get',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`
    },
    url,
  })

  const memberCount = response.data.filter(obj => !obj.user.bot).length
  const botCount = response.data.filter(obj => obj.user.bot).length

  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      memberCount,
      botCount,
      totalUsers: memberCount + botCount,
    }),
  }
}
