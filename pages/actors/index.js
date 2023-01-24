import { useState } from "react"

function ActorList() {

    const [actors, setActors] = useState([])

    const getActors = async() => {
        const response = await fetch("api/actors")
        const data = await response.json()
        console.log(data)
        setActors(data)
    }

    return (
        <>
            <h1>List of Actors</h1>
            <button onClick={getActors}>Load</button>
            {actors.map(actor => {
                return (
                    <div key={actor.actor_id}>
                        {actor.actor_id} {actor.first_name} {actor.last_name} {actor.date_of_birth}
                    </div>
                )
            })
            }
        </>
    )
}

export default ActorList