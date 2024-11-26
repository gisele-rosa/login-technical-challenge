import React, { useState } from 'react';
import './Login.css';
import login from '../../assets/images/login.jpg';
import chathappy from '../../assets/icons/chathappy.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className="login-container">
      <img src={login} alt="login-happy-people" className="login-image"/>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} class="login-form">
          <div class="login-title">
            <h1>Happy Login</h1>
            <img src={chathappy} alt="chat-happy"></img>
          </div>
          <label bold>E-mail</label>
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
          />
          <a href="/" class="forgot-password">Esqueci minha senha</a>
          <button type="submit" class="button-enter">
            Entrar
          </button>
          <a href="/" class="register">Ainda não tenho uma conta</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
