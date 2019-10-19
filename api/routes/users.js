const router = require('express').Router();
const User = require('../models/User');
const translate = require('../controllers/translate');
const verifyToken = require('../controllers/verifyToken');

router.get('/', async (req, res) => {
    try {
        const users  = await User.find({}, 'name id admin translationCount');    
        res.json({
            success: true, 
            message: 'fetched users successfully', 
            users
        });
    } catch (err) {
        res.json({success: false, message: 'failed to fetch users'})
    }
});

router.post('/translate', (req, res) => { 
    translate(req, res);
});

router.patch('/count/:id', async (req, res) => {
    try {
        const update = await User.updateOne({
            _id: req.params.id
        },  
            {
                $inc: { translationCount: 1 } 
            })
            res.json({success: true, message: 'user translation count successfully increased', update});
    } catch (err) {  
        res.json({success: false, message: 'user translation count not increased', update});
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
            const userToRemove = await User.findByIdAndRemove({ _id: req.params.id });
            res.json({
                success: true, 
                message: 'user deleted successfully',
                id: userToRemove._id
            });
        }
    catch (err) {
        res.status(404).res.json({
            success: false, 
            message: 'delete user unsuccessful',
        })
    }
})

module.exports = router;

  


