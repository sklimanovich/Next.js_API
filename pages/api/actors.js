import executeQuery from "./db"

export default async function hendler(req, res) {

    if (req.method === "GET") {
        try {
            const result = await executeQuery({
                query: 'SELECT * FROM actors',
                values: [req.body.content]
            })
            res.status(200).json(result)
        } catch (error) {
            console.log( error )
        }
    }
}