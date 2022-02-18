/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// TODO - convert to TypeScript 

export const Square = (props) => {
    const { value, onClick, disabled } = props; 
    return (
        <button 
            type="button" className="square" 
            onClick={onClick}
            disabled={disabled}
        >
            {value}
        </button>
    );
    
}

Square.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
}
