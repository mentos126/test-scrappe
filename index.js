const express = require('express')
const app = express()
const http = require('http').Server(app)
const cors = require('cors')
const PORT = process.env.PORT | 8080

const request = require('request')

app.use(express.static(`${__dirname}dist/`))
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/test/*', function (req, res) {
  request(req.url.substring(6), function (error, response, body) {
    res.send(body)
  })
})

http.listen(PORT, () => { console.log(`listening on *:${PORT}`) })
