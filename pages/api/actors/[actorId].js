import executeQuery from "../db"

export default async function handler(req, res) {
    const {actorId} = req.query

    if (req.method === "GET") {
        try {
            const result = await executeQuery({
                query: 'SELECT * FROM actors WHERE actor_id=(?)',
                values: actorId
            })
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }

    else if (req.method === "DELETE") {
        try {
            const result = await executeQuery({
                query: 'DELETE FROM actors WHERE actor_id=(?)',
                values: actorId
            })
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }

    else if (req.method === "PATCH") {
        const content = req.body.form
        try {
            const result = await executeQuery({
                query: 'UPDATE actors SET first_name=(?), last_name=(?), date_of_birth=(?) WHERE actor_id=(?)',
                values: [content.first_name, content.last_name, content.birthdate, actorId]
            })
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }
}