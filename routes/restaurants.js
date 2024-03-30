const { Restaurant } = require('../models');
const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    const restuarants = await Restaurant.findAll({});
    res.json(restuarants);
});


router.get('./:id', async (req, res) => {
    const number = req.params.id;
    const restaurant = await Restaurant.findByPk(number);
    res.json(restaurant);
})

router.post('/', [
    check("name").not().isEmpty(),
    check("location").not().isEmpty(),
    check("cuisine").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.json({ errors: errors.array() })
    } else{
    await Restaurant.create(req.body);
    const restaurants = await Restaurant.findAll({});
    res.json(restaurants);
    }
});

router.put('./:id', async (req,res) => {
        const updatedRest = await Restaurant.update(req.body, {
            where: { id: req.params.id },
        });
        res.json(updatedRest); 
    })
module.exports = router;