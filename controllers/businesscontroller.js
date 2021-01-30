const router = require('express').Router(); 
const jwt = require('jsonwebtoken'); 
const Business = require('../Db').import('../models/business'); 
const validateSession = require('../middleware/validateSession');

router.post('/new', (req, res) => {
    Business.create({
        name: req.body.name, 
        description: req.body.description,
        location: req.body.location, 
        wins: req.body.wins,
        losses: req.body.losses,
        verified: req.body.verified,
        userId: req.body.userId
    }) 
    .then(business => {
        res.status(200).json({
            business: business, 
            message: 'business created successfully', 
            sessionToken: validateSession.token
        })
    })
    .catch(err => res.status(500).json({ error: err }))
})

router.put('/edit/:id', (req, res) => {
    Business.update(req.body, {
        where: { id: req.params.id }
    })
    .then(business => res.status(200).json(business))
    .catch(err => res.status(500).json({ error: err }))
});

router.delete('/delete/:id',async (req, res) =>{
    try{
        const results = await Business.destroy({
            where: { email: req.params.id}
        });
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json({error:err});
    }
})

router.get('/', (req, res) => {
    Business.findAll()
        .then(bus => res.status(200).json(bus))
        .then(busses => console.log(busses))
        .catch(err => res.status(500).json({error: err}))
})

//Returns an array of the user's businesses
router.get('/my/:id', (req, res) => {
    Business.findAll(req.body, {
        where: { userId: req.params.id }
    })
    .then(business => res.status(200).json(business))
    .catch(err => res.status(500).json({error: err}));
})

router.get('/:id', (req,res) => {
    Business.findOne(req.body, {
        where: { id: req.params.id }
    })
    .then(bus => res.status(200).json(bus))
    .catch(err => res.status(500).json({error: err.message}))
})
module.exports = router; 