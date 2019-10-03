const router = require('express').Router();
const User = require('../models/User');
const translate = require('../controllers/translate');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { name, password } = req.body
        const user = await User.findOne({ name: name, password: password });
        res.json({
            name: user.name,
            translationCount: user.translationCount,
            admin: user.admin
        })
    } catch (err) {
        res.status(404).send('user not found');
    }
})

router.post('/translate', (req, res) => {
    const { text, language, } = req.body;
    translate(res, text, language);
});

router.patch('/count/:id', async (req, res) => {
    try {
        const update = await User.updateOne({
            _id: req.params.id
        },
            {
                $inc: { translationCount: 1 }
            })
        
        res.json(update);
    } catch (err) {
        res.json({ message: err })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user.admin) {
            const removedUser = await User.findByIdAndRemove({ _id: req.params.id });
            res.json(removedUser);
        } else {
            res.status(404).send('user not valid or user is an admin')
        }
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router;

  


