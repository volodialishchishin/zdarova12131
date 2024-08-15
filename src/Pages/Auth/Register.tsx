import './LoginForm.scss';
import Logo from '../../assets/union.svg';
import {useNavigate} from "react-router-dom";

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="login-form">
            <h2>Зареєструватися</h2>
            <form>
                <div className="form-group">
                    <input placeholder={"Електронна адреса"} type="email" className="email register" required/>
                </div>
                <button className={"button"} onClick={()=>{navigate('/confirm-code')}}> Отримати код {<img src={Logo} alt=""/>}</button>

            </form>
            <p>Зареєстровані? <a onClick={()=>{navigate('/')}}>Увійти в профіль.</a></p>
        </div>
    );
};

export default RegisterForm;
