import { useEffect, useState } from "react"
import { IPerson } from "../interfaces/IPerson"
import styles from "../styles/Character.module.css";
import { ImageCard } from "./ImageCard";

export const Character = () => {

    const [persons, setPersons] = useState(Array<IPerson>)

    useEffect(() => {
        // const load = async() => {
        //     const res = await fetch("https://rickandmortyapi.com/api/character")
        //     const data = await res.json()
        //     setPersons(data.results)
        // }

        // load()

        fetch("https://potterapi-fedeperin.vercel.app/en/characters")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setPersons(data)
            })
    }, [])


    return (
        <>
            {persons.length > 0 ?
                <div className={styles.cards}>
                    {persons.map((person) => {
                        return (
                            <div key={person.index} className={styles.personCard}>
                                <ImageCard src={person.image} />
                                <div className={styles.infoPerson}>
                                    <h3 className={styles.nickname}>                                        
                                        {person.nickname}     
                                        <span className={styles.fullName}>{person.fullName}</span>                                   
                                    </h3>                                    
                                    <p>birthdate: {person.birthdate}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                : <h1>The request failed</h1>
            }

        </>
    )
}
