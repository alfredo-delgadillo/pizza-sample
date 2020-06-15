const { Router } = require('express');
const router = Router();

const { pizzaorder, pizzaorderdetail } = require('pizza-sequelize');

router.get('/orders', (req, res) => {
    pizzaorder.findAll()
        .then(orders => res.status(200).json(orders))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
});

router.get('/orders/:id/details', (req, res) => {
    pizzaorderdetail.findAll({
        where: {
            pizzaorderId: req.params.id
        }
    })
        .then(details => res.status(200).json(details))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
});

router.post('/orders', (req, res) => {
    if (req.body.pizza && req.body.toppings) {
        let date = new Date();
        pizzaorder.create({
            createdAt: date,
            updatedAt: date,
            pizzaId: req.body.pizza.id            
        })
            .then(order => {
                let e;
                var toppings = req.body.toppings;
                if (Array.isArray(toppings)) {
                    toppings.forEach(topping => {
                        pizzaorderdetail.create({                            
                            createdAt: date,
                            updatedAt: date,
                            pizzaorderId: order.id,
                            toppingId: topping.id
                        })
                            .catch(err => {
                                e = err;
                                console.log(err);
                                res.sendStatus(404);
                            });
                    });

                    //If none error response 200
                    if (!e) {
                        res.status(200).json(true);
                    }
                }
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            });
    }
});

module.exports = router;