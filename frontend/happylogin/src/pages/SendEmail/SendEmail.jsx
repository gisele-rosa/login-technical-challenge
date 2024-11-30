import React from 'react';
import './SendEmail.css';
import email from '../../assets/images/email-send.jpg';

const SendEmail = () => {

  return (
    <div className="email-container">
      <p className="email-title">Enviamos um e-mail de confirmação!</p>
      <img src={email} alt="email-send" className="email-image"/>
      <a href="/" className="email-back">Voltar para a tela de Login</a>
    </div>
  );
};

export default SendEmail;
