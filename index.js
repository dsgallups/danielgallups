const express = require('express');

const app = express();

const path = require('path');

app.get('/', (req, res) => {
    console.log("GET on /static/");
    res.sendFile(path.join(__dirname +  '/content/index.html'))
});

app.get('/static/:type/:fileName', (req, res) => {
    console.log("GET on /static/");

    switch (req.params.type) {
        case "media":
            res.sendFile(__dirname + "/content/static/media/" + req.params.fileName);
            break;
        case "css":
            res.sendFile(__dirname + "/content/static/css/" + req.params.fileName);
            break;
        case "js":
            res.sendFile(__dirname + "/content/static/js/" + req.params.fileName);
        case "roboto":
            res.sendFile(__dirname + "/content/static/roboto/" + req.params.fileName);
        default:
            res.sendStatus(404);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port`, port));