import executeQuery from "../db"

export default async function handler(req, res) {

    if (req.method === "GET") {
        try {
            const result = await executeQuery({
                query: 'SELECT * FROM actors',
                values: [req.body.content]
            })
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }

    else if (req.method === "POST") {
        const content = req.body.form
        try {
            const result = await executeQuery({
                query: 'INSERT INTO actors(first_name, last_name, date_of_birth) VALUES(?,?,?)',
                values: [content.first_name, content.last_name, content.birthdate]
            })
            res.status(201).json(result)
        } catch (error) {
            console.log(error)
        }
    }
}
