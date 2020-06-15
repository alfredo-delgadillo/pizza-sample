const { Router } = require('express');
const router = Router();

const { topping } = require('pizza-sequelize');

router.get('/toppings', (req,res) => {
    topping.findAll()
        .then(toppings => res.status(200).json(toppings))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
});

router.get('/toppings/:id', (req,res) => {
    topping.findAll({
        where: {
                id: req.params.id
            }
        })
        .then(topping => res.status(200).json(topping))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
});

module.exports = router;