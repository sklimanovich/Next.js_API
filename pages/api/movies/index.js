import executeQuery from "../db"

export default async function handler(req, res) {

    if (req.method === "GET") {
        try {
            const result = await executeQuery({
                query: 'SELECT * FROM movies',
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
                query: 'INSERT INTO movies(movie_title, movie_genre, director, release_date) VALUES(?,?,?,?)',
                values: [content.title, content.genre, content.director, content.releaseDate]
            })
            res.status(201).json(result)
        } catch (error) {
            console.log(error)
        }
    }
}