if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'JS')));
const sendMessage = require('./API/wit');

const token = process.env.WIT_TOKEN;

app.get('/send', async (req, res) => {
    console.log(req.query.message);
    let message = req.query.message.toString();
    message = message.replace(/\s/g, '%20');
    await sendMessage(message, token)
        .then(resp => res.send(resp))
        .catch(err => console.error(err));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});