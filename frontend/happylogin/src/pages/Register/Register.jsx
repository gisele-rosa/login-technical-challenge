import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { createUser } from '../../utils/api';
import './Register.css';
import register from '../../assets/images/register.jpg';
import chathappy from '../../assets/icons/chathappy.png';

const Register = () => {
  const [name, setName] = useState('');
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

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    
    if (password.length < minLength) {
      setErrorMessage('A senha deve ter pelo menos 8 caracteres.');
      return false;
    }
    
    if (!hasNumber.test(password)) {
      setErrorMessage('A senha deve conter um número.');
      return false;
    }

    setErrorMessage('');
    setPasswordInvalid(false);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validatePassword(password)) {
      setIsLoading(false);
      setPasswordInvalid(true);
      return;
    }

    const validatedName = removeTagsScripts(name);
    const validatedEmail = removeTagsScripts(email);
    const validatedPassword = removeTagsScripts(password);

    try {
      const newRecord = await createUser(validatedName, validatedEmail, validatedPassword);
      console.log(`Dados criados com sucesso! ID: ${newRecord.id}`);
      navigate('/email');
    } catch (error) {
      console.error('Erro ao criar os dados:', error);
      setIsLoading(false);
      throw error;
    }
  };

  return (
    <div className="register-container">
      <img src={register} alt="register-happy-people" className="register-image"/>
      <div className="register-form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-title">
            <h1>Venha ser Happy</h1>
            <img src={chathappy} alt="chat-happy"></img>
          </div>
          <label>Nome</label>
          <input 
            type="text" 
            placeholder="Digite seu Nome" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
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
          />
          {passwordInvalid && (
            <div className="error-message">{errorMessage}</div>
          )}
          {isLoading ? (
            <div className="spinner-container">
              <Oval/>
            </div>
          ):(
          <button type="submit" className="button-enter">
            Registrar
          </button>
          )}
          <a href="/" className="back">Voltar</a>
        </form>
      </div>
    </div>
  );
};

export default Register;
