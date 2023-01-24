import { useState, useEffect } from "react"

function ActorList() {

    const [actors, setActors] = useState([])

    var i = 0

    const getActors = async() => {
        const response = await fetch("api/actors")
        const data = await response.json()
        setActors(data)
    }

    useEffect(() => {
        getActors()
    }, [])

    return (
        <>
            <div>
                <h1>List of Actors</h1>
                {actors.map(actor => {
                    return (
                        <div key={actor.actor_id}>
                            {actor.actor_id} {actor.first_name} {actor.last_name} {actor.date_of_birth}
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}

export default ActorList
