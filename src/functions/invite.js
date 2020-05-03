import axios from 'axios'

exports.handler = async function(event, context) {
  const baseUrl = `https://discordapp.com/api/v6`

  const channel = process.env.CHANNEL_ID

  const url = `${baseUrl}/channels/${channel}/invites`

  const response = await axios({
    method: 'post',
    url: url,
    headers: {
      Authorization: `Bot ${process.env.BOT_TOKEN}`,
      'Content-Type': 'application/json'
    },
    data: {
      max_age: 86400,
      max_uses: 1,
      temporary: false,
      unique: true,
    },
  })

  const code = response.data.code

  return event.queryStringParameters.redirect
    ? {
        statusCode: 301,
        headers: {
          Location: `https://discord.gg/${code}`,
          'Cache-Control': 'no-cache',
        },
      }
    : {
        statusCode: 200,
        headers: {
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ inviteCode: code }),
      }
}
