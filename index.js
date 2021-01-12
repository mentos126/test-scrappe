import cors from 'cors'
import express from 'express'
import http from 'http'
import request from 'request'

const PORT = process.env.PORT || 8080
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(express.json())

app.get('/test/*', function (req, res) {
  request(req.url.substring(6), function (error, response, body) {
    res.send(body)
  })
})

app.get('*', function (req, res) {
  res.send('coucou')
})

server.listen(PORT, () => {
  console.log('listening on *:' + PORT)
})
