import { useEffect, useState } from "react"
import styles from "../styles/Character.module.css"

export const ImageCard = ({ src }: { src: string }) => {
    const [isLoading, setLoading] = useState(true)

    return (
        <>
            {isLoading && <div className={styles.loader}>
                <h4>⏳ Загрузка...</h4>
            </div>}
            <img
                alt="фото персонажа"
                src={src}
                className={styles.imageCard}
                style={{ display: isLoading ? "none" : "block" }}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </>
    )
}