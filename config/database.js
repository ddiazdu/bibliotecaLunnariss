import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config({ path: ".env" })

const {DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT} = process.env


const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})

export default db;