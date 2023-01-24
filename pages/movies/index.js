import { useEffect, useState } from "react"

function MoviesList() {

    const [movies, setMovies] = useState([])

    const getMovies = async() => {
        const response = await fetch("api/movies")
        const data = await response.json()
        setMovies(data)
    }

    useEffect(() => {
        getMovies()
    }, [])

    return (
        <>
            <h1>List of Movies</h1>
            {movies.map(movie => {
                return (
                    <div key={movie.movie_id}>
                        {movie.movie_title} {movie.movie_genre} {movie.director} {movie.release_date}
                    </div>
                )
            })}
        </>
    )
}

export default MoviesList
