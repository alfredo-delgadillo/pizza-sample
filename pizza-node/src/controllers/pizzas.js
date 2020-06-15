var express = require('express');
const router = express.Router();

const { pizza, topping } = require('pizza-sequelize');

router.get('/pizzas', (req,res) => {
    pizza.findAll()
        .then(pizzas => res.status(200).json(pizzas))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
});

router.get('/pizzas/:id', (req,res) => {
    pizza.findOne({
        where: {
                id: req.params.id
            }
        })
        .then(pizzas => res.status(200).json(pizzas))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
});

router.get('/pizzas/:id/toppings', (req,res) => {
    topping.findAll({
        where: {
                pizzaId: req.params.id
            }
        })
        .then(toppings => res.status(200).json(toppings))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
});

module.exports = router;