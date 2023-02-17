
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index', { title: 'custom title', message: "custom message" })
});


module.exports = router ;