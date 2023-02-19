import { useState, useEffect } from "react"
import Link from "next/link"

function ActorList() {

    const [actors, setActors] = useState([])
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        birthdate: ""
    })

    const getActors = async() => {
        const response = await fetch("api/actors")
        const data = await response.json()
        setActors(data)
    }

    const postActor = async() => {
        const response = await fetch("api/actors", {
            method: "POST",
            body: JSON.stringify({form: form}),
            headers: {
                "Content-Type": "application/json" 
            }
        })
        const data = await response.json()
        console.log(data)
        getActors()
    }

    const deleteActor = async(actorId) => {
        const response = await fetch(`api/actors/${actorId}`, {
            method: "DELETE"
        })
        const data = await response.json()
        console.log(data)
        getActors()
    }

    const handleInput = async(e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value

        setForm((prevState) => ({
            ...prevState,
            [fieldName] : fieldValue
        }))
    }

    const validateForm = async(e) => {
        e.preventDefault()
        postActor()
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

    useEffect(() => {
        getActors()
    }, [])

    return (
        <>
            <main>
                <div className="font-mono text-gray-600">
                    <div className="bg-gray-100 mx-10 my-10 rounded px-10 py-5 relative">
                        <Link href="/">
                            <div className="flex cursor-pointer hover:text-gray-400 absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="uppercase font-semibold mx-1">Home</span>
                            </div>
                        </Link>
                        <div className="flex justify-center text-4xl font-bold">
                            <h1>Actors List</h1>
                        </div>
                        <div onClick={openForm} className="flex justify-end cursor-pointer hover:text-gray-400" id="addMovie">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="mx-2 uppercase">Add new actor</span>
                        </div>
                        <div className="hidden" id="form">
                            <form onSubmit={validateForm}>
                                <ul className="flex flex-col justify-end items-end mt-5">
                                    <li>
                                        <label htmlFor="first_name">First name: </label>
                                        <input className="pl-1" type="text" name="first_name" id="first_name" required onChange={handleInput}/>
                                    </li>
                                    <li className="mt-2">
                                        <label htmlFor="last_name">Last name: </label>
                                        <input className="pl-1" type="text" name="last_name" id="last_name" required onChange={handleInput}/>
                                    </li>
                                    <li className="mt-2">
                                        <label htmlFor="birthdate">Birthdate: </label>
                                        <input className="pl-1" type="text" name="birthdate" id="birthdate" required onChange={handleInput}/>
                                    </li>
                                    <li>
                                        <button type="submit" className="mt-3 bg-blue-600 rounded-full px-3 py-1 uppercase text-white hover:bg-blue-300 
                                        hover:text-gray-500 transition ease-out duration-500">Add to list</button>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        <div className="mt-8 grid lg:grid-cols-5 gap-10">
                            {actors.map(actor => {
                                return (
                                    <div key={actor.actor_id} className="bg-white rounded hover:shadow-lg cursor-pointer relative">
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
                                        <div className="absolute top-0 right-0 mt-5 mr-5" onClick={() => deleteActor(actor.actor_id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 hover:w-7 hover:h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 
                                                2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
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

export default ActorList
