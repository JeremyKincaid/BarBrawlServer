const router = require('express').Router(); 
const jwt = require('jsonwebtoken'); 
const bcrpyt = require('bcryptjs'); 
const User = require('../Db').import('../models/User'); 
const validateSession = require('../middleware/validateSession');


//USER SIGN UP
router.post('/signup', (req, res) => {
    User.create({
        email: req.body.email, 
        password: bcrpyt.hashSync(req.body.password, 8),
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        displayName: req.body.displayName,
        role: req.body.role,
        xp: req.body.xp
    }) 
    .then(user => {
        const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: '7d' })

        res.status(200).json({
            user: user, 
            message: 'user created successfully', 
            sessionToken: validateSession.token
        })
    })
    .catch(err => res.status(500).json({ error: err }))
}) 

router.post('/signin', (req, res) => {
    User.findOne({ where: { email: req.body.email }})
        .then(user => {
            if (user) {
                bcrpyt.compare(req.body.password, user.password, (err, matches) => {
                    if(matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: '7d' }); 

                        res.status(200).json({
                            user: user, 
                            message: 'user successfully authenticated', 
                            sessionToken: token
                        })
                    } else {
                        res.status(500).json({ error: 'password mismatch' })
                    }
                })
            } else {
                res.status(500).json({ error: 'user not found' })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
})

router.put('/edit/:id', (req, res) => {
    User.update(req.body, {
        where: { id: req.params.id }
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }))
});

router.post('/signin', (req, res) => {
    User.findOne({ where: { email: req.body.email }})
        .then(user => {
            if (user) {
                bcrpyt.compare(req.body.password, user.password, (err, matches) => {
                    if(matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: '7d' }); 

                        res.status(200).json({
                            user: user, 
                            message: 'user successfully authenticated', 
                            sessionToken: token
                        })
                    } else {
                        res.status(500).json({ error: 'password mismatch' })
                    }
                })
            } else {
                res.status(500).json({ error: 'user not found' })
            }
        })
        .catch(err => res.status(500).json({ error: err }))
})

router.delete('/delete/:id',async (req, res) =>{
    try{
        const results = await User.destroy({
            where: { email: req.params.id}
        });
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json({error:err});
    }
})

module.exports = router; 