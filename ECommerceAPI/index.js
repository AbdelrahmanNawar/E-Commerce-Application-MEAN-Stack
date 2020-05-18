const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
// const dbConfig = require('./database/db');

const ordersRouter = require('./routes/orders');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
////////////////////////////////
//Auth
const { authenticateJWT } = require('./routes/middlewares/authenticatejwt');
const bodyParser = require('body-parser');
////////////////////////////////

const mongoURL = process.env.MONGO_URL || 'mongodb+srv://Admin:123@ecdb-m2hjo.gcp.mongodb.net/ECommerce?retryWrites=true&w=majority';
const port = process.env.PORT || 3000;

mongoose.connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('Failed to connect to Mongodb,', error.message));

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    // extended: false
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));
app.use(cors());
app.use('*', cors());
app.use((reg, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Max-Age', 10000);
    next();
});

app.use(express.static('./assets/products'));
app.use(express.static('./assets/users'));
///////////////
// app.use(bodyParser.json());
const accessTokenSecret = 'nevennawarammar';
///////////////
// app.use('/api', authenticateJWT);
app.use('/api/orders', authenticateJWT, ordersRouter);
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => console.log(`Server listens on port ${port}`));