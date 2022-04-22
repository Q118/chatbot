const express = require('express');
const path = require('path');
const app = express();
const config = require('./config');

// const WitService = require('./API/wit');
app.use(express.urlencoded({ extended: true }))
// const router = require('./API/router');

const sendMessage = require('./API/wit');

// app.use('/bots/slack', slackRouter({ reservationService, witService, config }));
// const witService = new WitService(config.wit.token);



app.get('/send', async (req, res) => {
    console.log(req.query.message);
    let message = req.query.message.toString();
    message = message.replace(/\s/g, '%20');
    await sendMessage(message)
        .then(resp => res.send(resp))
        .catch(err => console.error(err));
    // res.send(response);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});