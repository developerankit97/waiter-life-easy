const Order = require('../models/order');

exports.getOrders = (req, res, next) => {
    Order.findAll()
        .then(orders => res.json(orders))
        .catch(e => console.log(e));
}

exports.postOrder = (req, res, next) => { 
    Order.create({
        price: parseInt(req.body.price),
        dish: req.body.dish,
        table: req.body.table
    })
      .then(order => res.json(order))
      .catch(e => console.log(e));
}

exports.getSingleOrder = (req, res, next) => {
    Order.findByPk(req.params.orderId)
        .then(order => res.json(order))
        .catch(e => console.log(e));
}

exports.putUpdateOrder = (req, res, next) => {
    Order.update({
        price: parseInt(req.body.price),
        dish: req.body.dish,
        table: req.body.table
    }, {
        where: {
            id: req.params.orderId
        }
    })
        .then(() => {
            return Order.findByPk(req.params.orderId)
                .then()
                .catch(e => console.log(e));
        })
        .then(order => res.json(order))
        .catch(e => console.log(e));
}

exports.deleteOrder = (req, res, next) => { 
    Order.destroy({
        where: {
            id: req.params.orderId
        }
    })
      .then((response) => res.json(response))
      .catch(e => console.log(e));
}
