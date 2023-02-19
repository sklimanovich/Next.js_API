import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function Movie({data}) {

    const [movies, setMovies] = useState([])
    const [form, setForm] = useState({
        id: "",
        title: "",
        genre: "",
        director: "",
        releaseDate: ""
    })
    const router = useRouter()

    const deleteMovie = async(movieId) => {
        const response = await fetch(`../api/movies/${movieId}`, {
            method: "DELETE"
        })
        const data = await response.json()
        console.log(data)
        goBack()
    }

    const updateMovie = async(movieId) => {
        const response = await fetch(`../api/movies/${movieId}`, {
            method: "PATCH",
            body: JSON.stringify({form: form}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = response.json()
        console.log(data)
        getMovie(movieId)
    }

    const getMovie = async(movieId) => {
        const response = await fetch(`../api/movies/${movieId}`)
        const data = await response.json()
        console.log(data)
        setMovies(data)
    }

    const handleInput = async(e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value

        setForm((prevState) => ({
            ...prevState,
            [fieldName] : fieldValue
        }))
    }

    const setFormId = async(movieId) => {
        setForm((prevState) => ({
            ...prevState,
            id: movieId
        }))
    }

    const validateForm = async(e) => {
        e.preventDefault()
        updateMovie(form.id)
        e.target.reset()
    }

    const openForm = async() => {
        const form = document.querySelector('#form')

        if (form.classList.contains('hidden')) {
            form.classList.remove('hidden')
        } else {
            form.classList.add('hidden')
        }
    }

    const goBack = () => {
        router.back()
    }

    useEffect(() => {
        setMovies(data)
    }, [])
    
    return (
        <>
            <main>
                <div className="font-mono text-gray-600 flex justify-center">
                    <div className="bg-gray-100 mx-10 my-10 rounded px-10 py-5 w-1/3 relative">
                        <div className="flex cursor-pointer hover:text-gray-400" onClick={goBack}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="uppercase font-semibold mx-1">Back</span>
                        </div>
                        <div className="flex justify-start text-4xl font-bold mt-5 mr-5">
                            <h1>Movie</h1>
                        </div>
                        <div>
                            {movies.map(movie => {
                                return (
                                    <div key={movie.movie_id}>
                                        <div className="bg-white rounded mt-4 p-2">
                                            <ul>
                                                <li className="font-bold text-xl">
                                                    <span>{movie.movie_title}</span>   
                                                </li>
                                                <li>
                                                    <span className="font-semibold">Genre: </span><span>{movie.movie_genre}</span>
                                                </li> 
                                                <li>
                                                    <span className="font-semibold">Director: </span><span>{movie.director}</span>
                                                </li>
                                                <li>
                                                    <span className="font-semibold">Release date: </span><span>{movie.release_date}</span>
                                                </li>
                                            </ul>
                                            <div className="absolute top-0 right-0 mt-5 mr-5" onClick={() => deleteMovie(movie.movie_id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 hover:w-10 hover:h-10 cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 
                                                    2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div onClick={openForm} className="flex justify-end cursor-pointer hover:text-gray-400 mt-5" id="addMovie">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="mx-2 uppercase">Edit movie</span>
                                        </div>
                                        <div className="hidden" id="form">
                                            <form onSubmit={validateForm}>
                                                <ul className="flex flex-col justify-end items-end mt-5">
                                                    <li>
                                                        <label htmlFor="title">Movie title: </label>
                                                        <input className="pl-1" type="text" name="title" id="title" required onChange={handleInput}/>
                                                    </li>
                                                    <li className="mt-2">
                                                        <label htmlFor="genre">Genre: </label>
                                                        <input className="pl-1" type="text" name="genre" id="genre" required onChange={handleInput}/>
                                                    </li>
                                                    <li className="mt-2">
                                                        <label htmlFor="director">Director: </label>
                                                        <input className="pl-1" type="text" name="director" id="director" required onChange={handleInput}/>
                                                    </li>
                                                    <li className="mt-2">
                                                        <label htmlFor="releaseDate">Release date: </label>
                                                        <input className="pl-1" type="text" name="releaseDate" id="releaseDate" required onChange={handleInput}/>
                                                    </li>
                                                    <li>
                                                        <button type="submit" className="mt-3 bg-blue-600 rounded-full px-3 py-1 uppercase text-white hover:bg-blue-300 
                                                        hover:text-gray-500 transition ease-out duration-500" onClick={() => setFormId(movie.movie_id)}>Submit</button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getStaticPaths() {
    const response = await fetch("http://localhost:3000/api/movies")
    const data = await response.json()

    const paths = data.map((movie) => {
        return {
            params: {
                movieId: `${movie.movie_id}`
            }
        }
    })

    return {paths, fallback: false}
}

export async function getStaticProps(context) {
    const {params} = context
    const {movieId} = params
    const response = await fetch(`http://localhost:3000/api/movies/${movieId}`)
    const data = await response.json()
    
    return {
        props: {
            data: data
        }
    }
}
