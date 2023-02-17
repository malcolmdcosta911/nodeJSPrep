
const express = require('express');
const router = express.Router();
const Joi = require('joi');

let courses = [{ id: 1, name: 'course1' }, { id: 2, name: 'course2' }, { id: 3, name: 'course3' }];

////////////////////////////////get id-wise

router.get('/', (req, res) => { res.send(courses); });

router.get('/:id', (req, res) => {

    const course = courses.find(e => e.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('course with given id doesnt exist');

    res.send(course);
});


//router.get('/api/posts/:month/:year', (req, res) => { res.send(req.query) })


////////////////////////////////post

router.post('/', (req, res) => {


    //validate
    const { error } = validateCourse(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    //create and send
    const course = { id: courses.length + 1, name: req.body.name };
    courses.push(course);
    res.send(course);
});


/////////////////////////////////put 


router.put('/:id', (req, res) => {

    //check exist
    const course = courses.find(e => e.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('course with given id doesnt exist');

    //validate
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //create and send
    course.name = req.body.name;
    res.send(course);

});




router.delete('/:id', (req, res) => {

    const course = courses.find(e => e.id === parseInt(req.params.id));

    if (!course) return res.status(404).send('course with given id doesnt exist');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);


});



//validate course
const validateCourse = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
};


module.exports= router;