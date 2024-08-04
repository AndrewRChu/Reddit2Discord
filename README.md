This is a simple Google Apps Script that periodically scans a list of subreddits and sends any new posts to a text channel on Discord.

## Requirements
- A Google account
- A Discord webhook

## Setup
1. Go to [Google Apps Script](https://www.google.com/script/start/) and create a new project.
2. Select the editor tab and paste the code from [here](https://github.com/AndrewRChu/Reddit2Discord/blob/main/Code.gs).
3. Replace the link in the `discordWebhook` variable with your own discord webhook URL.
   See how to get a discord webhook URL [here](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).
4. Add your subreddits to the `feeds` variable.
5. Save the project then press run and allow it the requested permissions.
6. Select the trigger tab and add a new trigger.
   This will determine how often the subreddits are scanned, so change it to whatever you see fit.
   To scan every 15 minutes, set the following options:
   - Select event source: `Time-driven`
   - Select type of time based trigger: Minutes timer
   - Select minute interval: Every 15 minutes
  
## Limitations
Google limits you to 20,000 fetch calls per day. Each time the script is run, 1 fetch call is made to each subreddit to retrieve the new posts and 1 fetch call is made for each post sent on Discord. Depending on how frequent posts are made on the subreddits, you may want to decrease the scanning frequency.

For more details, see [Quotas for Google Services](https://developers.google.com/apps-script/guides/services/quotas)
