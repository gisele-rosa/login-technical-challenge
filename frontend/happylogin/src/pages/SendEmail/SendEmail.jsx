import React from 'react';
import './SendEmail.css';
import email from '../../assets/images/email-send.jpg';

const SendEmail = () => {

  return (
    <div className="email-container">
      <img src={email} alt="email-send" className="email-image"/>
    </div>
  );
};

export default SendEmail;
