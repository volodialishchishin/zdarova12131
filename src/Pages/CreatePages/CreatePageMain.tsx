import "./CreatePageMain.scss";
import Arrow from '../../assets/angle_small_down_outline.svg';
import Diagram from '../../assets/diagram-cells.svg';
import Table from '../../assets/list_outline.svg';
import Expander from '../../assets/Expander.svg';
import Sort from '../../assets/sort_outline.svg';
import Search from '../../assets/search_outline.svg';
import Settings from '../../assets/settings_outline.svg';
import Clock from '../../assets/clock_outline.svg';
import Name from '../../assets/name_outline.svg';
import Menu from '../../assets/menu-dots-vertical.svg';
import { Gantt, Task, ViewMode } from "gantt-task-react";
import { useState } from "react";
import "gantt-task-react/dist/index.css";
import { useNavigate } from "react-router-dom";
import {differenceInDays} from 'date-fns'

function CreatePageMain() {
    const [isTableActive, setActive] = useState(false);
    const [isNewProduct, setIsNewProduct] = useState(false);
    const [view] = useState<ViewMode>(ViewMode.Day);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const products = [{id: "1", name: 'Продукт 1', items: [{name:'1'}]}, {id: "2", name: 'Продукт 2', items: []}];
    const selectedProduct = products.find((product) => product.id === selectedProductId);
    const [tasks, setTasks] = useState<Task[]>(selectedProduct?.items || [])
    const navigate = useNavigate();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);


    let columnWidth = 70;
    if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }

    const handleTaskDelete = (task: Task) => {
        const conf = window.confirm("Are you sure about " + task.name + " ?");
        if (conf) {
            setTasks(tasks.filter((t) => t.id !== task.id));
        }
        return conf;
    };

    const handleDblClick = (task: Task) => {
        alert("On Double Click event Id:" + task.id);
    };

    const handleSelect = (task: Task, isSelected: boolean) => {
        console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
    };

    const handleExpanderClick = (task: Task) => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        console.log("On expander click Id:" + task.id);
    };

    const handleTitleDoubleClick = () => {
        setEditingTitle(true);
        setNewTitle(selectedProduct?.name || 'Назва нового продукту');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    const toggleMenu = (id:string) => {
        setMenuOpen(!isMenuOpen);

        setSelectedItem(id)
    };
    const handleDeleteItem = () => {}

    const handleTitleBlur = () => {}

    const handleTitleKeyPress = () => {}


    return (
        <div className="container">
            <h1>
                <p onClick={() => { setIsNewProduct(false); }}>Додавання нових eлементів</p>
                {isNewProduct && <p>&nbsp;/&nbsp;Додавання нового продукту</p>}
            </h1>
            <div className={'buttons'}>
                <button onClick={() => { navigate('/'); }} className={"back-button"}>
                    <img src={Arrow} alt="arrow" /> Назад
                </button>
                <div className={"select-buttons"}>
                    <button onClick={() => { setActive(false); }} className={`select-button-column ${!isTableActive ? 'active' : ''}`}>
                        <img src={Diagram} alt="Diagram" /> Вигляд колонок
                    </button>
                    <button onClick={() => { setActive(true); }} className={`select-button-table ${isTableActive ? 'active' : ''}`}>
                        <img src={Table} alt="Table" /> Вигляд таблицею
                    </button>
                </div>
            </div>
            <div className={`content ${isNewProduct || selectedProductId !== null ? 'between' : ''}`}>
                <div className={'products-wrapper'}>
                    <div className={"products"}>
                        <div className={"header"}>
                            <h2>Продукти</h2>
                            <button>На весь екран <img src={Expander} alt="Expander"/></button>
                        </div>
                        <div className={"widgets"}>
                            <button><img src={Sort} alt="Sort"/></button>
                            <button><img src={Settings} alt="Settings"/></button>
                            <div className={"search"}>
                                <div className={"img"}>
                                    <img src={Search} alt="Search"/>
                                </div>
                                <input type="text" placeholder={'Пошук'}/>
                            </div>
                        </div>
                        <div className={'props'}>
                            <p><img src={Name} alt="Name"/>Назва</p>
                            <p><img src={Clock} alt="Clock"/>Час</p>
                        </div>
                        <div className={'products-section'}>
                            {products.map((product) => (
                                <div
                                    className={`product ${selectedProductId === product.id ? 'active' : ''}`}
                                    key={product.id}
                                    onClick={() => {
                                        setIsNewProduct(false);
                                        setSelectedProductId(product.id);
                                        setTasks(product.items || []);
                                    }}
                                >
                                    <div className={'wrapper'}>
                                        <p>{product.name}</p>
                                        <div className={'options'}>
                                            <button><img src={Menu} alt="Menu"/></button>
                                            <button><img src={Arrow} alt="Arrow"/></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => {
                                setIsNewProduct(true);
                                setSelectedProductId(null);
                            }} className={isNewProduct ? 'add-product active' : 'add-product'}>
                                Додати новий продукт
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"line"}/>
                <div
                    className={(isNewProduct || selectedProductId !== null) ? 'create-product' : 'create-product none'}>
                    <div className={'header-title'}>
                        {editingTitle ? (
                            <input
                                type="text"
                                value={newTitle}
                                className={'handle-title'}
                                onChange={handleTitleChange}
                                onBlur={handleTitleBlur}
                                onKeyDown={handleTitleKeyPress}
                                autoFocus
                            />
                        ) : (
                            <h2 onDoubleClick={handleTitleDoubleClick}>
                                {selectedProductId !== null ? selectedProduct?.name : 'Назва нового продукту'}
                            </h2>
                        )}
                    </div>
                    <div className={'hr'}/>
                    <div className={'main-section'}>
                        <div className={'info'}>
                            {selectedProduct?.items?.length ?
                                <div className={'add-time'}>
                                    <p><img src={Clock} alt="Clock"/>Час</p>
                                    <div className={'time-enter'}>
                                        <input type="text"
                                               placeholder={'Введіть очікуваний час'}/>
                                        <div className={'img-wrapper'}>
                                            <img src={Arrow} alt="Arrow"/>
                                        </div>
                                    </div>
                                </div> : ''
                            }
                            <button className={'add-property'}>Додати властивість +</button>
                            <input type="text" placeholder={'Додати Опис'} className={'description-input'}/>
                            {selectedProductId !== null &&
                                <div className={"manufacture-path-container"}>
                                    <div className={'manufacture-path'}>
                                        <div className={'header full'}>
                                            <h2>Маршрут виробництва</h2>
                                            <button>На весь екран <img src={Expander} alt="Expander"/></button>
                                        </div>
                                        <div className={"widgets full"}>
                                            <button><img src={Settings} alt="Settings"/></button>
                                            <div className={"search"}>
                                                <div className={"img"}>
                                                    <img src={Search} alt="Search"/>
                                                </div>
                                                <input type="text" placeholder={'Пошук'}/>
                                            </div>
                                        </div>
                                        {selectedProduct?.items?.length ?
                                            <div className={'ganta'}>
                                                <div>
                                                    <Gantt
                                                        tasks={tasks}
                                                        viewMode={view}
                                                        onDelete={handleTaskDelete}
                                                        onDoubleClick={handleDblClick}
                                                        onSelect={handleSelect}
                                                        onExpanderClick={handleExpanderClick}
                                                        listCellWidth={""}
                                                        columnWidth={columnWidth}
                                                        barProgressColor={'#D2F1D4'}
                                                        fontFamily={'\'Inter\', sans-serif'}
                                                        barFill={80}
                                                    />
                                                </div>
                                            </div> :
                                            <div>Добавте хоч один виріб, щоб відтворити діаграму Ганта</div>
                                        }
                                    </div>
                                </div>
                            }
                            <div className={"item-wrapper"}>
                                <div className={'items'}>
                                    <div className={'header full'}>
                                        <h2>Задіяні вироби</h2>
                                        <button>На весь екран <img src={Expander} alt="Expander"/></button>
                                    </div>
                                    <div className={"widgets full"}>
                                        <button><img src={Sort} alt="Sort"/></button>
                                        <button><img src={Settings} alt="Settings"/></button>
                                        <div className={"search"}>
                                            <div className={"img"}>
                                                <img src={Search} alt="Search"/>
                                            </div>
                                            <input type="text" placeholder={'Пошук'}/>
                                        </div>
                                    </div>
                                    <div className={'props full'}>
                                    <p><img src={Name} alt="Name"/>Назва</p>
                                        <p><img src={Clock} className={'clock'} alt="Clock"/>Час</p>
                                    </div>
                                    {selectedProduct?.items.map((item) => {
                                          return  <div className={"product"}>
                                                <div className={'wrapper'}>
                                                    <p className={'title'}>{item.name}</p>
                                                    <p className={'time'}>{differenceInDays(item.end, item.start)} днів </p>
                                                    <div className={'options'}>
                                                        <button onClick={() => {
                                                            toggleMenu(item.id)
                                                        }}>
                                                            <img className={'menu'} src={Menu} alt=""/>
                                                        </button>
                                                        {(selectedItem && selectedItem === item.id) && isMenuOpen && (
                                                            <div className="dropdown-menu">
                                                                <button className={'delete-button'}
                                                                        onClick={handleDeleteItem}>Видалити елемент
                                                                </button>
                                                            </div>
                                                        )}
                                                        <button><img src={Arrow} alt="Arrow"/></button>
                                                    </div>
                                                </div>
                                            </div>
                                    })}
                                </div>
                            </div>
                            <div className={"item-wrapper"}>
                                <div className={'items'}>
                                    <div className={'header full'}>
                                        <h2>Вироби</h2>
                                        <button>На весь екран <img src={Expander} alt="Expander"/></button>
                                    </div>
                                    <div className={"widgets full"}>
                                        <button><img src={Sort} alt="Sort"/></button>
                                        <button><img src={Settings} alt="Settings"/></button>
                                        <div className={"search"}>
                                            <div className={"img"}>
                                                <img src={Search} alt="Search"/>
                                            </div>
                                            <input type="text" placeholder={'Пошук'}/>
                                        </div>
                                    </div>
                                    <div className={'props full'}>
                                        <p><img src={Name} alt="Name"/>Назва</p>
                                        <p><img src={Clock} alt="Clock"/>Час</p>
                                    </div>
                                    <div className={"product"}>
                                        <div className={'wrapper'}>
                                            <p>Виріб</p>
                                            <div className={'options'}>
                                                <button onClick={toggleMenu}>
                                                    <img className={'menu'} src={Menu} alt=""/>
                                                </button>
                                                {isMenuOpen && (
                                                    <div className="dropdown-menu">
                                                        <button className={'delete-button'}
                                                                onClick={handleDeleteItem}>Видалити елемент
                                                        </button>
                                                    </div>
                                                )}
                                                <button><img src={Arrow} alt="Arrow"/></button>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        navigate(`/create/product/${selectedProductId}/item`)
                                    }} className={'add-product'}>
                                        Додати новий виріб +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePageMain;
