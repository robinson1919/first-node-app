const express = require('express');
const _ = require('underscore');
const EventEmitter = require('events');

const Logger = require('./logger');

const app = express();
const logger = new Logger();

const courses = [
    {
        id: 1,
        name: "Modern JavaScript"
    },
    {
        id: 2,
        name: "Dart"
    },
    {
        id: 3,
        name: "Python"
    }
]


app.get('/', (req, res, next) => {
    res.json(courses);
});

logger.on('messageLogger', arg => {
    console.log('Listener called', arg)
})


logger.log('message')



const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`listening on port ${port}`));
