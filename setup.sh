mkdir config

echo '
{
  "token": "<insert discord token see discord developer portal>",
  "maintainer": "204674824910405633"
}

' >> config/config.json

echo '
{
  "<sever id (right click on the server > copy id)> (With , you can even add another server to the list)": {
    "botChannelID": "<channel id for the bot commands and messages (right click on the channel > copy id)>",
    "botWhiteList": [
      "<Bot ids for bots immune to the filter (right click bot > copy id)>"
    ],
    "bots": [
      "<Your bots on the server (ids) (right click bot > copy id)>"
    ]
  }
}
' >> config/ServerConfigs.json


