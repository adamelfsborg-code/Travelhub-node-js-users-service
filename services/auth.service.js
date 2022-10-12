class AuthService {

    constructor(db) {
        this.db = db;
    }

    async findUser(userDetails) {
        const { id } = userDetails
        const users = await this.db.query(`SELECT * FROM users WHERE id=$1`, [id])
        return users.rows;
    }

    createUser(userDetails) {
        const { username, password, createdBy } = userDetails;
        this.db.query(
            'INSERT INTO users (username, password, createdby) VALUES($1, $2, $3)',
            [username, password, createdBy],
        (res) => {
            console.log('USER CREATED');
        })
    }
}

module.exports = AuthService;