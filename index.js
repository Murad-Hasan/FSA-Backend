const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./src/routes/user'))

app.get('/health', (req, res) => {
    res.status(200).json({message: 'all is ok'})
})

const connectionUrl = 'mongodb://127.0.0.1:27017/user'

mongoose.connect(connectionUrl, {
    //time out after 30 seconds
    connectTimeoutMS: 30000,
}).then(() => {
    console.log('Database connected');
    app.listen(  4000, async () => {
        console.log(`Server is listening on port 4000`)
    })

}).catch((err) => {
    console.log('Error: ', err);
});
