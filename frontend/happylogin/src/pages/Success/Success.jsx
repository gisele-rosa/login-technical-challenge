import React from 'react';
import './Success.css';
import success from '../../assets/images/success.jpg';

const Success = () => {

  return (
    <div className="success-container">
      <img src={success} alt="register-happy-people" className="success-image"/>
    </div>
  );
};

export default Success;
