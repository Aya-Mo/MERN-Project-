const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routes/index');


const app = express();
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true });

app.use(express.json());

app.use('/', routers);

app.use('*', (req, res, next) => {
    res.status(404).json({ err: 'NOT_FOUND' });
});

app.use((err, req, res, next) => {

    console.error(err);
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json(err.errors);
    }
    if (err.code === 11000) {
        res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    if (err.message === 'UN_AUTHENTICATED') {
        res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
    }
    res.status(503).end();
});



const { PORT = 3100 } = process.env;

app.listen(PORT, () => {
    console.log('APP is up and ready on:', PORT);
})