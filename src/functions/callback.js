const axios = require('axios')

exports.handler = async function(event, context) {
  const baseUrl = `https://discordapp.com/api`

  const data = {
    grant_type: 'authorization_code',
    code: event.queryStringParameters.code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    scope: process.env.OAUTH_SCOPES,
    redirect_uri: process.env.REDIRECT_URI,
  }

  const url = `${baseUrl}/oauth2/token`

  const response = await axios({
    method: 'post',
    url,
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ tokens: response.data }),
  }
}
