import { useState } from "react"
import styles from "../styles/Character.module.css"

export const ImageCard = ({ src }: { src: string }) => {
    const [isLoading, setLoading] = useState(true)
    const [isError, setError] = useState(false)

    return (
        <div className={styles.imageCard}>
            {isLoading && <h4>⏳ Загрузка...</h4>}
            {isError && <h4><h2>❌</h2>Не удалось загрузить</h4>}
            <img
                alt="Не удалось загрузить"
                src={src}
                className={styles.imagePerson}
                style={{
                    display: isLoading || isError ? "none" : "block",
                    padding: isError ? "10px" : "0"
                }}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setLoading(false)
                    setError(true)
                }}
            />
        </div>
    )
}