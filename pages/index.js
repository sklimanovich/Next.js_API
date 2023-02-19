import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {

	const [movies, setMovies] = useState([])
	const [actors, setActors] = useState([])

	const getMovies = async () => {
		const response = await fetch("api/movies")
		const data = await response.json()
		const randomData = [...data].sort(() => 0.5 - Math.random())
		setMovies(randomData.slice(0, 8))
	}

	const getActors = async () => {
		const response = await fetch("api/actors")
		const data = await response.json()
		const randomData = [...data].sort(() => 0.5 - Math.random())
		setActors(randomData.slice(0, 10))
	}

	useEffect(() => {
		getMovies()
		getActors()
	}, [])

	return (
		<>
			<main>
				<div className="font-mono text-gray-600">
					<div className="bg-gray-100 mx-10 my-10 rounded px-10 py-5">
						<div className="flex justify-center text-4xl font-bold">
							<h1>Movies List</h1>
						</div>
						<div className="mt-8 grid lg:grid-cols-4 gap-10">
							{movies.map(movie => {
								return (
									<div key={movie.movie_id} className="bg-white rounded hover:shadow-lg cursor-pointer">
										<Link href={`/movies/${movie.movie_id}`}>
											<div>
												<ul className="m-3">
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
											</div>
										</Link>
									</div>
								)
							})}
							<div className="flex justify-center col-span-4">
								<Link href="/movies">
									<div className="btn">
										<span>Check more</span>
									</div>
								</Link>
							</div>
						</div>
					</div>
					<div className="bg-gray-100 mx-10 my-10 rounded px-10 py-5">
						<div className="flex justify-center text-4xl font-bold">
							<h1>Actors List</h1>
						</div>
						<div className="mt-8 grid lg:grid-cols-5 gap-10">
							{actors.map(actor => {
								return (
									<div key={actor.actor_id} className="bg-white rounded hover:shadow-lg cursor-pointer">
										<Link href={`/actors/${actor.actor_id}`}>
											<ul className="m-3">
												<li className="font-bold text-xl">
													<span>{actor.first_name} {actor.last_name}</span>
												</li>
												<li>
													<span className="font-semibold">Born: </span><span>{actor.date_of_birth}</span>
												</li>
											</ul>
										</Link>
									</div>
								)
							})}
							<div className="flex justify-center col-span-5">
								<Link href="/actors">
									<div className="btn">
										<span>Check more</span>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
