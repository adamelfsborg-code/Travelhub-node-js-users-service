class AuthService {

    constructor(db) {
        this.db = db;
    }

    async findUser(id) {
        const sql = `
        SELECT
            u.id,
            u.username,
            up.first_name,
            up.last_name,
            up.avatar_image,
            up.email,
            up.phone_number,
            up.birth_date,
            CASE WHEN
                date_part('day', up.birth_date) = date_part('day', CURRENT_DATE) AND
                date_part('month', up.birth_date) = date_part('month', CURRENT_DATE)
            THEN 1 ELSE 0 end as birthday,
            i.file_name,
            i.file_path,
            i.file_type
        FROM users.users u
        LEFT JOIN users.users_profile up ON u.id = up.user_id AND up.enabled = 1
        LEFT JOIN images.profile_image_connections pic ON pic.profile_id = u.id AND pic.enabled = 1
        LEFT JOIN images.images i ON i.id = pic.image_id AND i.enabled = 1
        WHERE u.enabled = 1 AND u.id=$1`
        const sqlData=[id]
        const response = await this.db.cursor(sql, sqlData)
        return response.rows;
    }

    async createUser(userDetails) {
        const { username, password} = userDetails
        const sql = 'INSERT INTO users.users (username, password) VALUES($1, $2)'
        const sqlData = [username, password]
        const response = await this.db.cursor(sql, sqlData)
        return response.rows
    }
}

module.exports = AuthService;