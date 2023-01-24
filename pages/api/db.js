import mysql from '../../node_modules/serverless-mysql'

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
})

export default async function executeQuery({ query, values }) {
    console.log(query, values)
    try {
        const result = await db.query(query, values)
        await db.end()
        return result
    } catch (error) {
        return { error }
    }
}
