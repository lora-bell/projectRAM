import { useEffect, useState } from "react"
import { IPerson } from "../interfaces/IPerson"
import styles from "../styles/Character.module.css";
import { ImageCard } from "./ImageCard";

export const Character = () => {

    const [persons, setPersons] = useState(Array<IPerson>)
    const [searchPerson, setSearchPerson] = useState<string>("")

    useEffect(() => {
        // const load = async() => {
        //     const res = await fetch("https://rickandmortyapi.com/api/character")
        //     const data = await res.json()
        //     setPersons(data.results)
        // }

        // load()

        fetch("https://potterapi-fedeperin.vercel.app/en/characters")
            .then((res) => {
                if (!res.ok) {
                    throw new Error()
                }
                return res.json()
            })
            .then((data) => {
                setPersons(data)
            })
            .catch((e) => setPersons([]))
    }, [])

    const filterPerson = persons.filter(person => {
        return person.nickname.toLowerCase().includes(searchPerson.toLowerCase()) ||
            person.fullName.toLowerCase().includes(searchPerson.toLowerCase())

    })

    return (
        <>
            {persons.length > 0 ?
                <div className={styles.container}>
                    <input
                        type="text"
                        placeholder="🔍 Поиск по имени..."
                        className={styles.inputSearch}
                        value={searchPerson}
                        onChange={(elem) => setSearchPerson(elem.target.value)}
                    >
                    </input>
                    <div className={styles.cards}>
                        {persons.map((person) => {
                            const isVisible =
                                person.nickname.toLowerCase().includes(searchPerson.toLowerCase()) ||
                                person.fullName.toLowerCase().includes(searchPerson.toLowerCase())

                            return (
                                <div
                                    key={person.index}
                                    className={styles.personCard}
                                    style={{ display: isVisible ? "flex" : "none" }}
                                >
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
                    {filterPerson.length === 0 && <h3 className={styles.info}>Персонажи с таким именем не найдены</h3>}
                </div>
                : <h3 className={styles.info}>Персонажи не получены<br />Попробуйте зайти на страницу позже</h3>
            }

        </>
    )
}
