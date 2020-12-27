const Joi = require('joi');
const express = require('express');
const { indexOf } = require('underscore');
const app = express();

app.use(express.json());


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
    res.send("Hello world");
});

app.get('/api/courses/', (req, res, next) => {
    res.json(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCouse(req.body);    
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    
    res.status(200).send(course);
});

app.put('/api/courses/:id', (req, res, next) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');

    const { error } = validateCouse(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.status(400).send(course);
});

app.get('/api/courses/:id', (req, res, next) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');
    res.json(course);
});

app.delete('/api/courses/:id', (req, res, next) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.status(200).send(course);
});


const validateCouse = course => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(course);

    return result;
}

const port = process.env.PORT || 3000; 

app.listen(port, () => console.log(`listening on port ${port}`));
