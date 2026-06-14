import { useEffect, useState } from "react"
import { IPerson } from "../interfaces/IPerson"
import styles from "../styles/Character.module.css";
import { ImageCard } from "./ImageCard";

export const Character = () => {

    const [persons, setPersons] = useState(Array<IPerson>)
    const [searchPerson, setSearchPerson] = useState<string>("")
    const [cardCount, setCardCount] = useState<number>(window.innerWidth <= 768 ? 6 : 10)
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
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

    useEffect(() => {
        const updateCardCount = () => {
            const newCardCount = window.innerWidth <= 768 ? 6 : 10
            setCardCount(newCardCount)
        }

        updateCardCount()
        window.addEventListener('resize', updateCardCount)

        return () => window.removeEventListener('resize', updateCardCount)
    }, [])


    const filterPerson = persons.filter(person => {
        return person.nickname.toLowerCase().includes(searchPerson.toLowerCase()) ||
            person.fullName.toLowerCase().includes(searchPerson.toLowerCase())

    })
    const pageCount = Math.ceil(filterPerson.length / cardCount)
    const startIndex = (currentPage - 1) * cardCount
    const endIndex = startIndex + cardCount
    const currentPagePersons = filterPerson.slice(startIndex, endIndex)
    const indexsCurrentPagePersons = currentPagePersons.map(item => item.index)

    useEffect(() => {
        if (currentPage > pageCount) {
            setCurrentPage(1)
        }
    }, [currentPage, pageCount])

    let pagination = []
    for (let i = 1; i <= pageCount; i++) {
        pagination.push(i)
    }

    return (
        <>
            {persons.length > 0 ?
                <div className={styles.container}>
                    <input
                        type="text"
                        placeholder="🔍 Поиск по имени..."
                        className={styles.inputSearch}
                        value={searchPerson}
                        onChange={(elem) => {
                            setSearchPerson(elem.target.value)
                            setCurrentPage(1)
                        }}
                    >
                    </input>
                    <div className={styles.cards}>
                        {persons.map((person) => {
                            const isVisible = indexsCurrentPagePersons.includes(person.index)

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
                    <div>Страницы: {pagination.map(item => {
                        return <button
                            key={item}
                            className={styles.buttonPage}
                            onClick={() => setCurrentPage(item)}
                            disabled={item === currentPage ? true : false}
                            // aria-label={`Страница ${item}`}
                        >{item}</button>
                    })}</div>
                    {filterPerson.length === 0 && <h3 className={styles.info}>Персонажи с таким именем не найдены</h3>}
                </div>
                : <h3 className={styles.info}>Персонажи не получены<br />Попробуйте зайти на страницу позже</h3>
            }

        </>
    )
}
