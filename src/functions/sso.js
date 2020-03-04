const querystring = require('querystring')

exports.handler = async function(event, context) {
  const baseUrl = `https://discordapp.com/api`

  const qs = querystring.stringify({
    response_type: 'code',
    client_id: process.env.CLIENT_ID,
    scope: process.env.OAUTH_SCOPES,
    redirect_uri: process.env.REDIRECT_URI,
    prompt: 'consent',
  })

  const url = `${baseUrl}/oauth2/authorize?${qs}`

  return event.queryStringParameters.redirect
    ? {
        statusCode: 301,
        headers: {
          Location: url,
          'Cache-Control': 'no-cache',
        },
      }
    : {
        statusCode: 200,
        headers: {
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ url }),
      }
}
