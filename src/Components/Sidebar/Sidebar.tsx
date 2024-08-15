import React, { useState } from 'react';
import './Sidebar.scss';
import Profile from '../../assets/user_outline.svg';
import Mailbox from '../../assets/mailbox_empty_outline.svg';
import Search from '../../assets/search_outline.svg';
import Main from '../../assets/apps_outline.svg';
import SubItem from '../../assets/list_outline.svg';
import CollapseIcon from '../../assets/Frame 57.svg';
import Arrow from '../../assets/angle_small_down_outline.svg';
import Add from '../../assets/Frame 63.svg';
import {useNavigate} from "react-router-dom";

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mainHovered, setMainHovered] = useState(false);

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const navigate = useNavigate();

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <img src={CollapseIcon} className="collapse" onClick={handleCollapse} alt="collapse" />
            <div className="menu">
                <div className="item">
                    <img src={Profile} alt="Profile"/>
                    <p className={`text ${collapsed ? 'hidden' : ''}`}>Юра Куліков</p>
                </div>
                <div className="item">
                    <img src={Search} alt="Search"/>
                    <p className={`text ${collapsed ? 'hidden' : ''}`}>Пошук</p>
                </div>
                <div className="item">
                    <img src={Mailbox} alt="Mailbox"/>
                    <p className={`text ${collapsed ? 'hidden' : ''}`}>Повідомлення</p>
                </div>
                <div
                    className="item-main"
                    onClick={() => setMainHovered(!mainHovered)}
                >
                    <img src={mainHovered && !collapsed ? Arrow : Main} alt="Main"/>
                    <p className={`text ${collapsed ? 'hidden' : ''}`}>Головна</p>
                </div>
                {!collapsed && (
                    <ul
                        className={`sub-items ${mainHovered ? '' : 'hidden'}`}
                    >
                        <div className="item">
                            <img src={SubItem} alt="Orders"/>
                            <p className={`text ${mainHovered ? 'hidden' : ''}`}>Закази</p>
                        </div>
                        <div className="item">
                            <img src={SubItem} alt="Tech"/>
                            <p className={`text ${mainHovered ? 'hidden' : ''}`}>Техвідділ</p>
                        </div>
                        <div className="item">
                            <img src={SubItem} alt="Production"/>
                            <p className={`text ${mainHovered ? 'hidden' : ''}`}>Дільниці</p>
                        </div>
                    </ul>
                )}
                <div onClick={()=>{navigate('/create')}}
                    className="item-main"
                >
                    <img src={Add} alt="Main"/>
                    <p className={`text ${collapsed ? 'hidden' : ''}`}>Створити одиницю</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
