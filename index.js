require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const DbService = require('./services/db.service.js');

const AuthRouter = require('./routes/auth.router.js')

app.use(cors())
app.use(bodyParser.json())

class Users {
    constructor() {
        this.db = new DbService()
        this.con = this.db.con;

        this.authRouter = new AuthRouter(this.con)

        app.use('/', this.authRouter.routes)
    }
}

app.listen(3000, () => {
    console.log(`Server up on PORT: ${3000}`);
    new Users()
})
