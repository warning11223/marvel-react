import React from 'react';

import errorImg from './error.gif'

const Error = () => {
    return (
        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={errorImg} alt="error.gif"/>
    );
};

export default Error;
