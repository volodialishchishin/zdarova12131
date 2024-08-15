import Search from '../../assets/search_outline.svg'
import styles from './SearchInput.module.scss'

const defaultValue: { id: string, name: string }[] = []
type propsType = {
    items: { id: string, name: string }[],
    onItemClick: (id: string) => void
}

function SearchInput({items = defaultValue, onItemClick, ref}: propsType,) {
    console.log(ref)
    return (
        <div className={styles.wrapper} ref={ref} >
            <div className={styles.searchInput}>
                <div className={styles.search}>
                    <div className={styles.img}>
                        <img src={Search} alt=""/>
                    </div>
                    <input type="text" placeholder={'Пошук'}/>
                </div>
                <div className={styles.items}>
                    {items.map((item: { id: string, name: string }) => (
                        <div onClick={()=>onItemClick(item.id)} key={item.id} className={styles.item}>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
                <button>
                    Створити новий матеріал +
                </button>
            </div>
        </div>
    )
}

export default SearchInput
