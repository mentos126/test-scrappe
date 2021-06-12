import cors from 'cors'
import express from 'express'
import http from 'http'
import request from 'request'
import bodyParser from 'body-parser'

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

app.use(bodyParser.text())
app.use(express.json())

app.get('/test/*', function (req, res) {
  request(req.url.substring(6), function (error, response, body) {
    res.send(body)
  })
})

app.all('/show/*', function (req, res) {
  res.json({body: req.body, url: req.url})
})

app.all('/show2/*', function (req, res) {
  request(req.url.substring(7), function (error, response, body) {
    res.json(body)
  })
})

app.get('/m3u', function (req, res) {
  const file = `./m3us/toto.m3u`
  res.download(file)
})

app.get('/m3u-sports', function (req, res) {
  const file = `./m3us/mytoto.m3u`
  res.download(file)
})

app.get('/m3u-pt-sports', function (req, res) {
  const file = `./m3us/pt-2021-06-12.m3u`
  res.download(file)
})

app.get('*', function (req, res) {
  res.send('coucou')
})

server.listen(PORT, () => {
  console.log('listening on *:' + PORT)
})
