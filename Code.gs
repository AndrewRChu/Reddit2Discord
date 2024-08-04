const discordWebhook = "https://discord.com/api/webhooks/###/###"
const feeds = [
  "subreddit1",
  "subreddit2",
]

const props = PropertiesService.getScriptProperties()

function main() {
  const calls = []

  for (const feed of feeds) {
    const data = UrlFetchApp.fetch(`https://www.reddit.com/r/${feed}/new/.rss`)
    const root = XmlService.parse(data.getContentText()).getRootElement()
    const ns = root.getNamespace()
    const nsMedia = root.getNamespace("media")
    const entries = root.getChildren("entry", ns)
    const entriesToPost = []

    entries.every((entry, i) => {
      const id = entry.getChildText("id", ns)
      if (id == props.getProperty(feed)) { return false }
      entriesToPost.unshift(entry)
      return true
    })

    props.setProperty(feed, entries[0].getChildText("id", ns))

    entriesToPost.forEach(entry => {
      const title = entry.getChildText("title", ns)
      const url = entry.getChild("link", ns).getAttribute("href").getValue()
      const timestamp = entry.getChildText("published", ns)
      const thumbnail = entry.getChild("thumbnail", nsMedia)?.getAttribute("url").getValue()

      const data = {
        content: `New post from r/${feed}`,
        embeds: [{
          title: title,
          url: url,
          timestamp: timestamp,
          thumbnail: {
            url: thumbnail,
          }
        }]
      }

      const options = {
        url: discordWebhook,
        method: "POST",
        contentType: "application/json",
        payload: JSON.stringify(data)
      }

      calls.push(options)
    })
  }

  calls.sort((a, b) => {
    timeA = new Date(JSON.parse(a.payload).embeds[0].timestamp)
    timeB = new Date(JSON.parse(b.payload).embeds[0].timestamp)
    return timeA - timeB
  })

  // console.log(calls.map(call => JSON.parse(call.payload).embeds[0].timestamp))

  UrlFetchApp.fetchAll(calls)
}
