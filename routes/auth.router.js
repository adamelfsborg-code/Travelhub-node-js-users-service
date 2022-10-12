const router = require('express').Router();
const AuthService = require('../services/auth.service.js')

class AuthRouter {
    #con;
    constructor(con) {
        this.#con = con;
        this.routes = router
        this.service = new AuthService(this.#con)

        this.endpoints()
    }

    endpoints() {
        this.routes.get('/getuser', async (req, res) => {
            const user = await this.service.findUser(req.query)
            res.json(user)
        })

        this.routes.post('/createuser', (req, res) => {
            this.service.createUser(req.body)
        })
    }
}

module.exports = AuthRouter;
