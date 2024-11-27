import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { loginUser } from '../../utils/api';
import './Login.css';
import login from '../../assets/images/login.jpg';
import chathappy from '../../assets/icons/chathappy.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const navigate = useNavigate();

  const removeTagsScripts = (input) => {
    const element = document.createElement('div');
    if (input) {
      element.innerText = input;
      return element.innerHTML;
    }
    return '';
  }

  const handleButtonLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setPasswordInvalid(false);

    const validatedEmail = removeTagsScripts(email);
    const validatedPassword = removeTagsScripts(password);

    try {
      const newRecord = await loginUser(validatedEmail, validatedPassword);
      console.log(`Dados criados com sucesso! ID: ${newRecord.id}`);
      navigate('/success');
    } catch (error) {
      setIsLoading(false);
      console.error('Erro ao criar os dados:', error);
      setErrorMessage('Email ou Senha incorreto. Tente novamente.');
      setPasswordInvalid(true);
    }
  };

  return (
    <div className="login-container">
      <img src={login} alt="login-happy-people" className="login-image"/>
      <div className="login-form-container">
        <form onSubmit={handleButtonLogin} class="login-form">
          <div className="login-title">
            <h1>Happy Login</h1>
            <img src={chathappy} alt="chat-happy"></img>
          </div>
          <label>E-mail</label>
          <input 
            type="email" 
            placeholder="Digite seu e-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <label>Senha</label>
          <input 
            type="password" 
            placeholder="Digite sua senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            className={passwordInvalid ? 'input-error' : ''}
          />
          {passwordInvalid && (
            <div className="error-message">{errorMessage}</div>
          )}
          <a href="/" className="forgot-password">Esqueci minha senha</a>
          {isLoading ? (
            <div className="spinner-container">
              <Oval/>
            </div>
          ):(
            <button type="submit" className="button-enter">
            Entrar
          </button>
          )}
          <Link to ="/register" className="register">Ainda não tenho uma conta</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
