import "./CreateItemPage.scss";
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
import { Gantt, Task, ViewMode } from "gantt-task-react";
import { initTasks, getStartEndDateForProject } from "../../Components/Gant/tasks";
import {useState} from "react";
import "gantt-task-react/dist/index.css";
import {useNavigate} from "react-router-dom";



function CreatePageMain() {
    const [isTableActive, setActive] = useState(false)
    const [isNewItem,] = useState(false)
    const [view,] = useState<ViewMode>(ViewMode.Day);
    const [tasks, setTasks] = useState<Task[]>(initTasks());
    const [isItemSelected, setIsItemSelected] = useState<boolean>(false);

    let columnWidth = 70;
    if (view === ViewMode.Month) {
        columnWidth = 300;
    } else if (view === ViewMode.Week) {
        columnWidth = 250;
    }
    const navigate = useNavigate();

    const handleTaskChange = (task: Task) => {
        let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
        if (task.project) {
            const [start, end] = getStartEndDateForProject(newTasks, task.project);
            const project =
                newTasks[newTasks.findIndex((t) => t.id === task.project)];
            if (
                project.start.getTime() !== start.getTime() ||
                project.end.getTime() !== end.getTime()
            ) {
                const changedProject = { ...project, start, end };
                newTasks = newTasks.map((t) =>
                    t.id === task.project ? changedProject : t
                );
            }
        }
        setTasks(newTasks);
    };


    const handleTaskDelete = (task: Task) => {
        const conf = window.confirm("Are you sure about " + task.name + " ?");
        if (conf) {
            setTasks(tasks.filter((t) => t.id !== task.id));
        }
        return conf;
    };

    const handleProgressChange = async (task: Task) => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    };

    const handleExpanderClick = (task: Task) => {
        setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    };


    return (
        <div className="container">
            <h1>
                {<p onClick={()=>navigate('/create')} >Додавання нових продуктів</p>}
                {<p onClick={()=>navigate('/create')}>&nbsp;/&nbsp;Додавання нового продукту</p>}
                {<p onClick={()=>navigate('/create/item')}>&nbsp;/&nbsp;Додавання нового виробу</p>}
            </h1>
            <div className={'buttons'}>
                <button className={"back-button"} onClick={()=>{navigate('/create')}}><img src={Arrow}/> Назад</button>
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
                    <div className={'header-title'}><h2>{isItemSelected?'Продукт 1':'Назва нового продукту'}</h2>
                    </div>
                    <div className={'hr'}/>
                    <div className={'main-section'}>
                        <div className={'info'}>
                            <div className={'add-time'}>
                                <p><img src={Clock} alt=""/>Час</p>
                                <div className={'time-enter'}>
                                    <input type="text" placeholder={'Ведіть очікуваний час'}/>
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
                                        <h2>Вироби</h2>
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
                                            <p>Виріб</p>
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
                    <div className={'header-title'}><h2>{isItemSelected ?'Виріб 1':'Назва нового виробу'}</h2>
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
                            <button className={'add-property'}>Додати властивість +</button>
                            <input type="text" placeholder={'Додати Опис'} className={'description-input'}/>
                            {
                                (isItemSelected) &&
                                <div className={"manufacture-path-container"}>
                                    <div className={'manufacture-path'}>
                                        <div className={'header full'}>
                                            <h2>Маршрут виробництва</h2>
                                            <button>На весь екран <img src={Expander}/></button>
                                        </div>
                                        <div className={"widgets full"}>
                                            <button><img src={Settings} alt=""/></button>
                                            <div className={"search"}>
                                                <div className={"img"}>
                                                    <img src={Search} alt=""/>
                                                </div>
                                                <input type="text" placeholder={'Пошук'}/>
                                            </div>
                                        </div>
                                        <div className={'ganta'}>
                                            <div>
                                                <Gantt
                                                    tasks={tasks}
                                                    viewMode={view}
                                                    onDateChange={handleTaskChange}
                                                    onDelete={handleTaskDelete}
                                                    onProgressChange={handleProgressChange}
                                                    onExpanderClick={handleExpanderClick}
                                                    listCellWidth={""}
                                                    columnWidth={columnWidth}
                                                    barProgressColor={'#D2F1D4'}
                                                    fontFamily={'\'Inter\', sans-serif'}
                                                    barFill={80}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
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
                                    {isItemSelected &&
                                        <div className={"product"}>
                                            <div className={'wrapper'}>
                                                <p>Операція 1</p>
                                                <div className={'options'}>
                                                    <button><img src={Menu} alt=""/></button>
                                                    <button><img src={Arrow} alt=""/></button>
                                                </div>
                                            </div>
                                        </div>}
                                    <button onClick={() => {
                                        navigate('/create/operation')
                                    }} className={'add-product'}>Додати нову операцію +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

            </div>
        </div>
    );
}

export default CreatePageMain;
