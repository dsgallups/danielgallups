const express = require('express');

const app = express();

const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname +  '/content/index.html'))
});

app.get('/static/:path', (req, res) => {
    res.sendFile(__dirname + "/content/static/" + req.params.path);

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port`, port));