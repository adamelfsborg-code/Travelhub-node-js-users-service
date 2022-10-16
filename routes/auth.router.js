const router = require('express').Router();
const AuthService = require('../services/auth.service.js')
const { validateFindUser, validateCreateUser } = require('../middelwares/auth.middelware.js');

class AuthRouter {
    #con;
    constructor(con) {
        this.#con = con;
        this.routes = router
        this.service = new AuthService(this.#con)

        this.endpoints()
    }

    endpoints() {
        this.routes.get('/getuser', validateFindUser, async (req, res) => {
            const { id } = req.query
            const user = await this.service.findUser(id)
            res.json(user)
        })

        this.routes.post('/createuser', validateCreateUser, async (req, res) => {
            console.log(req.body)
            await this.service.createUser(req.body)
            res.json({ msg: 'User created' })
        })
    }
}

module.exports = AuthRouter;
