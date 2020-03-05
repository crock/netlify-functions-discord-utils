# Netlify Functions - Discord Server Utilities

The following repository contains some useful serverless functions that you can deploy to Netlify and use mostly for free depending on your Discord server's popularity.

As of the initial release, there are currently two functions included, but I'm open to adding more. Just open a GitHub issue to suggest what you would like to see or build it yourself and make a pull request to this repository.

## Included API Endpoints / Serverless Functions:
- /api/invite - generates a one-time use server invite on demand
```json
{ inviteCode: "R6wTYQ9" }
```
- /api/user-count - returns the total user counts of the Discord server
```json
{ 
  memberCount: 88, 
  botCount: 12, 
  totalUsers: 100 
}
```
- /api/sso - returns the correctly formatted oauth authorization url
```json
{
  url: "https://discordapp.com/api/oauth2/authorize?response_type=code&client_id=157730590492196864&scope=identify%20guilds.join&state=15773059ghq9183habn&redirect_uri=https%3A%2F%2Fnicememe.website&prompt=consent"
}
```
- /api/callback?code=AUTHORIZATION_CODE_HERE - send back the authorization code returned from the sso endpoint and get back a fresh token response 
```json
{
  tokens: {
    "access_token": "6qrZcUqja7812RVdnEKjpzOL4CvHBFG",
    "token_type": "Bearer",
    "expires_in": 604800,
    "refresh_token": "D43f5y0ahjqew82jZ4NViEr2YafMKhue",
    "scope": "identify"
  }
}
```
- /api/users - returns an array of simplified guild member objects 
```json
{
  members: [
    {
        id: "356143246889713679",
        username: "Croc#1111",
        joinDate: "2015-04-26T06:26:56.936000+00:00",
        avatarUrl: "https://cdn.discordapp.com/avatars/356143246889713679/f21a9cb92d303b028ffb4d72a99fb779.png?size=256"
    }
  ],
  bots: [
    {
        id: "490170400483966997",
        username: "Ogey the Penguin#2299",
        joinDate: "2015-04-26T06:26:56.936000+00:00",
        avatarUrl: "https://cdn.discordapp.com/avatars/490170400483966997/19a8f743ed811b75c48c92263afd4b3c.webp?size=256"
    }
  ],
  all: [
    {
        id: "356143246889713679",
        username: "Croc#1111",
        joinDate: "2015-04-26T06:26:56.936000+00:00",
        avatarUrl: "https://cdn.discordapp.com/avatars/356143246889713679/f21a9cb92d303b028ffb4d72a99fb779.png?size=256"
    },
    {
        id: "490170400483966997",
        username: "Ogey the Penguin#2299",
        joinDate: "2015-04-26T06:26:56.936000+00:00",
        avatarUrl: "https://cdn.discordapp.com/avatars/490170400483966997/19a8f743ed811b75c48c92263afd4b3c.webp?size=256"
    }
  ]
}
```

_Note: For the invite and sso endpoints, you can append `?redirect` to the url to return a 301 redirect directly instead of a JSON payload._

## Usage

To easily get up and running with these serverless functions, just use the _Deploy to Netlify_ button below. It will prompt you to login with your Netlify account or create one if you don't have one and then will ask you for some information about your server, so the functions will work. You will need to create a Discord bot user and obtain a "bot token" if you don't already have one. You can do this from the [Discord Developer Dashboard](https://discordapp.com/developers/applications).

[![Deploy to netlify button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/crock/netlify-functions-discord-utils)

## Contributing

- Fork this repository.
- Clone the forked repository.
- Use your Node package manager of choice to install the dependencies.
- Make your desired changes.
- Test Test Test
- Commit and push.
- Open a pull request right back here and wait for a response.
- Profit?
