import fetch from 'node-fetch'
import express from 'express'

const app = express()
const port = 3000

const cache = {}

app.use(express.static('public'))

app.get('/api/avatar', async (req, res) => {
  let username = req.query.username
  let url = null
  let from_cache = false

  if (username && cache[username] !== undefined) {
    url = cache[username]
    from_cache = true
  } else if (username) {
    url = await get_pic(username)
    cache[username] = url
  }
  res.send({url: url, from_cache: from_cache})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function get_pic(username) {
  let options = {
    'method': 'GET',
    'headers': {
      'Host': 'www.instagram.com'
    }
  };
  let response = await fetch(`https://www.instagram.com/${username}/?__a=1`, options)
  let j = await response.json()
  return await pic_to_base64(j.graphql?.user?.profile_pic_url_hd)
}

async function pic_to_base64(url) {
  let response = await fetch(url)
  let data = await response.arrayBuffer()
  const buffer = Buffer.from(data);
  const base64String = buffer.toString('base64');
  return base64String
}