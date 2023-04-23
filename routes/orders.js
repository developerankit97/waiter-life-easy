const express = require('express');

const router = express.Router();

const orderController = require('../controllers/order-controller');

router.get('/orders', orderController.getOrders);

router.get('/', orderController.getOrders);

router.get('/orders/:orderId', orderController.getSingleOrder);

router.post('/orders', orderController.postOrder);

router.put('/orders/:orderId', orderController.putUpdateOrder);

router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;