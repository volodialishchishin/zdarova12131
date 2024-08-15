import './LoginForm.scss';
import Logo from '../../assets/union.svg';
import {useNavigate} from "react-router-dom";

const ConfirmCode: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="login-form">
            <h2>Введіть код</h2>
            <form>
                <div className="form-group">
                    <input placeholder={"Код"} type="code" id="code" required/>
                </div>
                <button className={"button"} type="submit"> Увійти {<img src={Logo} alt=""/>}</button>

            </form>
            <p>Не отримали код? <a onClick={()=>{navigate('/register')}}>Надіслати повторно</a></p>
        </div>
    );
};

export default ConfirmCode;
