require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const DbService = require('./services/db.service.js');

const AuthRouter = require('./routes/auth.router.js')

const app = express();


app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json())

app.use((error, req, res, next) => {
    console.log('IM HERE')
    res.status(error.status).json({
        msg: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'cake' : error.stack,
    })
})

class Users {
    constructor() {
        this.db = new DbService().connect()

        this.authRouter = new AuthRouter(this.db)

        app.use('/', this.authRouter.routes)
    }
}

app.listen(3000, () => {
    console.log(`Server up on PORT: ${3000}`);
    new Users()
})
