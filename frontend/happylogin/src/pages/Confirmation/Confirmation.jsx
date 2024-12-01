import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { confirmationEmail } from '../../utils/api';
import './Confirmation.css';
import confirm from '../../assets/images/confirm.jpg';

const Confirmation = () => {

  const location = useLocation(); 

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token"); 

    const confirmEmail = async () => {
       
      try {
        await confirmationEmail(token);
        console.log(`Dados confirmados sucesso!`);
      } catch (error) {
        console.error('Erro ao criar os dados:', error);
      }
    };

    confirmEmail();
  }, [location]);

  return (
    <div className="confirmation-container">
      <p className="confirmation-title">e-mail confirmado!</p>
      <img src={confirm} alt="confirmed-email" className="confirmation-image"/>
      <a href="/" className="confirmation-back">Voltar para a tela de Login</a>
    </div>
  );
};

export default Confirmation;
