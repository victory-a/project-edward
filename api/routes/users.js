const router = require('express').Router();
const User = require('../models/User');
const translate = require('../controllers/translate');
const verifyToken = require('../controllers/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/translate', verifyToken, (req, res) => { 
    translate(req, res);
});

router.patch('/count/:id', verifyToken, async (req, res) => {
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

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, admin: false })
        if (!user.admin) {
            const userToRemove = await User.findByIdAndRemove({ _id: req.params.id });
            res.json(userToRemove);
        }
    } catch (err) {
        res.status(404).send('user not valid or user is an admin')
    }
})

module.exports = router;

  


