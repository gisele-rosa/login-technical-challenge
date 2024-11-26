import React, { useState } from 'react';
import './Register.css';
import register from '../../assets/images/register.jpg';
import chathappy from '../../assets/icons/chathappy.png';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { name, email, password });
  };

  return (
    <div class="register-container">
      <img src={register} alt="register-happy-people" class="register-image"/>
      <div class="register-form-container">
        <form onSubmit={handleSubmit} class="register-form">
          <div class="register-title">
            <h1>Venha ser Happy</h1>
            <img src={chathappy} alt="chat-happy"></img>
          </div>
          <label bold>Nome</label>
          <input 
            type="text" 
            placeholder="Digite seu Nome" 
            value={email} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
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
          <button type="submit" class="button-enter">
            Registrar
          </button>
          <a href="/" class="back">Voltar</a>
        </form>
      </div>
    </div>
  );
};

export default Register;
