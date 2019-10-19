const router = require('express').Router();
const User = require('../models/User');
const inputValidation = require('../controllers/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {
    // validate user input
    const { error } = await inputValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const userExists = await User.findOne({ name: req.body.name });
    if (userExists) return res.status(400).send('Username already exists');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = ({
        name: req.body.name,
        admin: req.body.admin,
        password: hashedPassword,
    })  

    try {
        User.create(user);
        res.json({success: true, message: 'registered successfully, go ahead and sign in', data: { }});
    } catch (err) {
        res.send(400).json({success: false, message: 'registered unsuccessfull'});
    }
});

router.post('/signin', async (req, res) => {
    //check if username exists
    const requestedUser = await User.findOne({ name: req.body.name });
    if (!requestedUser) return res.status(400).json({success: false, message: 'Invalid username or password'});

    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, requestedUser.password);
    if (!validPassword) return res.status(400).json({success: false, message: 'Invalid username or password'});
    //create and assign a token 
    const thirtyMinutes = 1800;
    const token = await jwt.sign({ _id: requestedUser.id }, process.env.TOKEN_SECRET, { expiresIn: thirtyMinutes });
    res.header('auth-token', token);

    try {
        const {name, id, admin, translationCount } = requestedUser;
        res.json({success: true, message: 'signed in successfully', user: { name, id, admin, translationCount}});
    } catch (err) {  
        res.status(404).json({success: false, message: 'sign in unsuccessful'});
    }
})

module.exports = router;