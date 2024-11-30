import React from 'react';
import './Success.css';
import success from '../../assets/images/success.jpg';

const Success = () => {

  return (
    <div className="success-container">
      <p className="success-title">Login com sucesso</p>
      <img src={success} alt="register-happy-people" className="success-image"/>
      <a href="/" className="exit">Sair</a>
    </div>
  );
};

export default Success;
