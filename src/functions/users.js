import axios from 'axios'

exports.handler = async function(event, context) {
  const baseUrl = `https://discordapp.com/api`
  const cdnUrl = `https://cdn.discordapp.com`

  const guild = process.env.GUILD_ID

  const url = `${baseUrl}/guilds/${guild}/members`

  const response = await axios({
    method: 'get',
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`
    },
    url
  })

  const getSimplifiedUserObject = member => {
    return {
      id: member.user.id,
      username: `${member.user.username}#${member.user.discriminator}`,
      joinDate: member.joined_at,
      avatarUrl: `${cdnUrl}/avatars/${member.user.id}/${member.user.avatar}.png?size=256`,
    }
  }

  const members = response.data
    .filter(obj => !obj.user.bot)
    .map(member => getSimplifiedUserObject(member))

  const bots = response.data
    .filter(obj => obj.user.bot)
    .map(bot => getSimplifiedUserObject(bot))

  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      members,
      bots,
      all: members.concat(bots).sort((a, b) => a.id - b.id),
    }),
  }
}
