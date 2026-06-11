import styles from "../styles/Header.module.css"

export const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>React приложение с карточками персонажей</h1>
        </header>
    )
}
