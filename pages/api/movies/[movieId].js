import executeQuery from "../db"

export default async function handler(req, res) {
    const {movieId} = req.query

    if (req.method === "GET") {
        try {
            const result = await executeQuery({
                query: 'SELECT * FROM movies WHERE movie_id=(?)',
                values: movieId
            })
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }

    else if (req.method === "DELETE") {
        try {
            const result = await executeQuery({
                query: 'DELETE FROM movies WHERE movie_id=(?)',
                values: movieId
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
                query: 'UPDATE movies SET movie_title=(?), movie_genre=(?), director=(?), release_date=(?) WHERE movie_id=(?)',
                values: [content.title, content.genre, content.director, content.releaseDate, movieId]
            })
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
        }
    }
}