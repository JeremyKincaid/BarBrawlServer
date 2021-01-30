const router = require('express').Router(); 
const jwt = require('jsonwebtoken'); 
const Brawl = require('../Db').import('../models/brawl'); 
const validateSession = require('../middleware/validateSession');

router.get('/', (req, res) => {
    Brawl.findAll()
        .then(bra => res.status(200).json(bra))
        .then(bras => console.log(bras))
        .catch(err => res.status(500).json({error: err}))
})


router.post('/new', (req, res) => {
    Brawl.create({
        name: req.body.name, 
        drink: req.body.drink,
        business1Pic: req.body.business1Pic, 
        business2Pic: req.body.business2Pic,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        winnerId: req.body.winnerId,
        business1Id: req.body.business1Id,
        business2Id: req.body.business2Id
    }) 
    .then(brawl => {
        res.status(200).json({
            brawl: brawl, 
            message: 'brawl created successfully', 
            sessionToken: validateSession.token
        })
    })
    .catch(err => res.status(500).json({ error: err.message }))
})

router.put('/edit/:id', (req, res) => {
    Brawl.update(req.body, {
        where: { id: req.params.id }
    })
    .then(brawl => res.status(200).json(brawl))
    .catch(err => res.status(500).json({ error: err }))
});

router.delete('/delete/:id',async (req, res) =>{
    try{
        const results = await Brawl.destroy({
            where: { email: req.params.id}
        });
        res.status(200).json(results)
    } catch (err) {
        res.status(500).json({error:err});
    }
})

module.exports = router; 