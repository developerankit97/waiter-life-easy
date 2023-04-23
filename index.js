const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/orders');
const sequelize = require('./util/database');
const app = express();

app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(orderRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Not found' });
})

sequelize
    .sync()
    .then(() => { app.listen(3000) })
    .catch(e => console.error(e));