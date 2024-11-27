import React from 'react';
import './ConfirmEmail.css';
import email from '../../assets/images/email-send.jpg';

const ConfirmEmail = () => {

  return (
    <div className="email-container">
      <img src={email} alt="email-send" className="email-image"/>
    </div>
  );
};

export default ConfirmEmail;
