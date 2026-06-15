import styles from "../styles/Character.module.css"

export const Pagination = (props: {
    pagination: Array<number>
    currentPage: number
    setCurrentPage: (page: number) => void
}) => {
    const { pagination, currentPage, setCurrentPage } = props

    return <div>
        Страницы: {pagination.map(item => {
            return <button
                key={item}
                className={styles.buttonPage}
                onClick={() => setCurrentPage(item)}
                disabled={item === currentPage ? true : false}
            // aria-label={`Страница ${item}`}
            >{item}</button>
        })}
    </div>
}