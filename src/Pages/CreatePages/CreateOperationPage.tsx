import "./CreateOperationPage.scss";
import Arrow from '../../assets/angle_small_down_outline.svg';
import Diagram from '../../assets/diagram-cells.svg'
import Table from '../../assets/list_outline.svg'
import Expander from '../../assets/Expander.svg'
import Sort from '../../assets/sort_outline.svg'
import Search from '../../assets/search_outline.svg'
import Settings from '../../assets/settings_outline.svg'
import Clock from '../../assets/clock_outline.svg'
import Name from '../../assets/name_outline.svg'
import Menu from '../../assets/menu-dots-vertical.svg'
import {useEffect, useRef, useState} from "react";
import "gantt-task-react/dist/index.css";
import {useNavigate} from "react-router-dom";
import SearchInput from "../../Components/SearchInput/SearchInput.tsx";
import {RootState, useAppDispatch} from "../../redux/store.ts";
import {fetchMaterials} from "./api/fetchMaterials.ts";
import {useSelector} from "react-redux";



function CreatePageMain() {
    const [isTableActive, setActive] = useState(false)
    const [isNewItem,] = useState(false)
    const [isItemSelected, setIsItemSelected] = useState<boolean>(false);
    const [isMaterialDialog, setMaterialDialog] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const materials = useSelector((state:RootState) => state.createOperation.materials);
    console.log(materials)
    useEffect(() => {
        dispatch(fetchMaterials())
    }, []);

    const blockRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            // @ts-ignore
            if (blockRef.current && !blockRef.current.contains(event.target)) {
                onBlurChange(); // Викликайте вашу функцію, яка сховає блок
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [blockRef]);
    const onBlurChange = () => {
        setMaterialDialog(false)
    }
    const onItemClick = (id: string) => {
        setMaterialDialog(false);
        console.log(id)
    }

    return (
        <div className="container">
            <h1>
                {<p onClick={()=>navigate('/create')} >Додавання нових продуктів</p>}
                {<p onClick={()=>navigate('/create')}>&nbsp;/&nbsp;Додавання нового продукту</p>}
                {<p onClick={()=>navigate('/create/item')}>&nbsp;/&nbsp;Додавання нового виробу</p>}
                {<p onClick={()=>navigate('/create/operation')}>&nbsp;/&nbsp;Додавання нового операції</p>}
            </h1>
            <div className={'buttons'}>
                <button className={"back-button"}><img src={Arrow}/> Назад</button>
                <div className={"select-buttons"}>
                    <button onClick={() => {
                        setActive(false)
                    }} className={`select-button-column ${!isTableActive ? 'active' : ''}`}><img src={Diagram} alt=""/>Вигляд
                        колонок
                    </button>
                    <button onClick={() => {
                        setActive(true)
                    }} className={`select-button-table ${isTableActive ? 'active' : ''}`}><img src={Table} alt=""/>Вигляд
                        таблицею
                    </button>
                </div>
            </div>
            <div className={`content ${isNewItem || isItemSelected ? 'between' : ''}`}>
                {<div className={'create-item'}>
                    <div className={'header-title'}><h2>{isItemSelected?'Виріб 1':'Назва нового виробу'}</h2>
                    </div>
                    <div className={'hr'}/>
                    <div className={'main-section'}>
                        <div className={'info'}>
                            <div className={'add-time'}>
                                <p><img src={Clock} alt=""/>Час</p>
                                <div className={'time-enter'}>
                                    <input type="text" placeholder={'Час виготовлення'}/>
                                    <div className={'img-wrapper'}>
                                        <img src={Arrow} alt=""/>
                                    </div>
                                </div>
                            </div>
                            <button className={'add-property'}>Додати поле +</button>
                            <input type="text" placeholder={'Додати Опис'} className={'description-input'}/>
                            <div className={"item-wrapper"}>
                                <div className={'items'}>
                                    <div className={'header full'}>
                                        <h2>Операції</h2>
                                        <button>На весь екран <img src={Expander}/></button>
                                    </div>
                                    <div className={"widgets full"}>
                                        <button><img src={Sort} alt=""/></button>
                                        <button><img src={Settings} alt=""/></button>
                                        <div className={"search"}>
                                            <div className={"img"}>
                                                <img src={Search} alt=""/>
                                            </div>
                                            <input type="text" placeholder={'Пошук'}/>
                                        </div>
                                    </div>
                                    <div className={'props full'}>
                                        <p><img src={Name} alt=""/>Назва</p>
                                        <p><img src={Clock} alt=""/>Час</p>
                                    </div>
                                    <div className={isItemSelected ? 'product active': 'product'}>
                                        <div className={'wrapper'} onClick={()=>{setIsItemSelected(true)}}>
                                            <p>Операція 1</p>
                                            <div className={'options'}>
                                                <button><img src={Menu} alt=""/></button>
                                                <button><img src={Arrow} alt=""/></button>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={()=>{setIsItemSelected(false)}} className={!isItemSelected?'add-product active':'add-product'}>Додати новий виріб +</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
                <div className={"line"}/>
                {<div className={'create-operation'}>
                    <div className={'header-title'}><h2>{isItemSelected?'Операція 1':'Додавання нової операції'}</h2>
                    </div>
                    <div className={'hr'}/>
                    <div className={'main-section'}>
                        <div className={'info'}>
                            <div className={'add-time'}>
                                <p><img src={Clock} alt=""/>Час</p>
                                <div className={'time-enter'}>
                                    <input type="text" placeholder={'Час виготовлення'}/>
                                    <div className={'img-wrapper'}>
                                        <img src={Arrow} alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className={'add-property'}>
                                <button  className={'add-property-button'} onClick={() => {
                                    (setMaterialDialog(true))
                                }}>Додати матеріал +

                                </button>
                                <div ref={blockRef}>
                                    {isMaterialDialog && <SearchInput   items={materials}
                                                                       onItemClick={onItemClick}/>}
                                </div>
                            </div>

                            <input type="text" placeholder={'Додати Опис'} className={'description-input'}/>
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    );
}

export default CreatePageMain;
