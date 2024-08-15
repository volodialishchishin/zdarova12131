import './LoginForm.scss';
import Logo from '../../assets/union.svg';
import {useNavigate} from "react-router-dom";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    return (
            <div className="login-form">
                <h2>Увійти</h2>
                <form>
                    <div className="form-group">
                        <input placeholder={"Електронна адреса"} type="email" id="email" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" placeholder={"Пароль"} required/>
                    </div>
                    <div className="form-group">
                        <div className="remember">
                            <input type="checkbox" id="remember"/>
                            <label htmlFor="remember" className="label">Запам'ятати мене </label>
                        </div>
                    </div>
                    <button className={'button'} type="submit"> Увійти {<img src={Logo} alt=""/>}</button>

                </form>
                <p>Не зареєстровані? <a onClick={()=>{navigate('/register')}}>Створити профіль.</a></p>
            </div>
    );
};

export default LoginForm;
