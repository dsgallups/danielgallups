const express = require('express')
const { fstat } = require('fs')
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload')
const logger = require('morgan')

const app = express()

const path = require('path')

const liveReloadServer = livereload.createServer()
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/")
    }, 100)
})
app.use(connectLiveReload())
app.use(logger("dev"))


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname +  '/content/index.html'))
});

app.get('/static/:type/:fileName', (req, res) => {

    switch (req.params.type) {
        case "media":
            res.sendFile(__dirname + "/content/static/media/" + req.params.fileName)
            break
        case "css":
            res.sendFile(__dirname + "/content/static/css/" + req.params.fileName)
            break
        case "js":
            res.sendFile(__dirname + "/content/static/js/" + req.params.fileName)
            break
        case "roboto":
            res.sendFile(__dirname + "/content/static/roboto/" + req.params.fileName)
            break
        case "icon":
            res.sendFile(__dirname + "/content/static/icon/" + req.params.fileName)
            break
        default:
            res.sendStatus(404)
    }
});
app.get('/static/media/icon/:fileName', (req, res) => {
    res.sendFile(__dirname + "/content/static/media/icon/" + req.params.fileName);
});

const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', () => console.log(`Listening on port`, port))