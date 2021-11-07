import express from "express";

const path = require('path');
const http = require("http");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);

app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/', express.static(path.join(__dirname, "../client")));
// app.use('/scenarios', express.static(path.join(__dirname, "../client")));
// app.use('/run/:id', express.static(path.join(__dirname, "../client")));
// app.use('/configuration', express.static(path.join(__dirname, "../common/conf")));
// app.use('/assets', express.static(path.join(__dirname, "../client/assets/dynamic")));

// app.use('/', (req, res) => {
//     res.redirect('/scenarios');
// });

app.get('/', (req, res) => {
    console.log(__dirname);
    res.send("Hello!");
    // res.sendFile(path.join(__dirname, '../client/index.html'));
});

server.listen(3000, () => console.log(`Server is listening on port ${3000}`));