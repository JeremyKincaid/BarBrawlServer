const router = require('express').Router(); 
const jwt = require('jsonwebtoken'); 
const Vote = require('../Db').import('../models/vote'); 
const validateSession = require('../middleware/validateSession');

router.post('/new', (req, res) => {
    Vote.create({
        businessId: req.body.businessId, 
        brawlId: req.body.brawlId,
        userId: req.body.userId 
    }) 
    .then(vote => {
        res.status(200).json({
            vote: vote, 
            message: 'vote created successfully', 
            sessionToken: validateSession.token
        })
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

router.get('/count/:bra/:bus', (req, res) => {
    Vote.findAll({
        where: { 
            brawlId: req.params.bra,
            businessId: req.params.bus
        }
    })
    .then(vote => res.status(200).json(vote))
    .catch(err => res.status(500).json({error: err.message}));
})


router.put('/edit/:id', (req, res) => {
    Vote.update(req.body, {
        where: { id: req.params.id }
    })
    .then(vote => res.status(200).json(vote))
    .catch(err => res.status(500).json({ error: err }))
});

router.delete('/delete/:id',async (req, res) =>{
    try{
        const results = await Vote.destroy({
            where: { email: req.params.id}
        });
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json({error:err});
    }
})
module.exports = router; 