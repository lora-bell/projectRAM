import { useEffect, useState } from "react"
import { IPerson } from "../interfaces/IPerson"
import styles from "../styles/Character.module.css";
import { ImageCard } from "./ImageCard";

export const Character = () => {

    const [persons, setPersons] = useState(Array<IPerson>)

    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                const { info, results } = data
                const countCharacter = info.count
                setPersons(results)
                // console.log({info}, {results}, {countCharacter})
            })
    }, [])



    return (
        <div>
            {persons.length > 0 ?
                <div className={styles.cards}>
                    {persons.map((person) => {
                        return (
                            <div key={person.id} className={styles.personCard}>
                                <ImageCard src={person.image} />
                                <h3>Name: {person.name}</h3>
                                <p>gender: {person.gender}</p>
                            </div>
                        )

                    })}
                </div>
                : <h1>The request failed</h1>
            }

        </div>
    )
}
