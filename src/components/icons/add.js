import React from 'react';
import PropTypes from 'prop-types';

export const AddIcon = ({ color }) => (
    <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d={'M20.0172 0C8.99225 0 0 8.96552 0 20C0 31.0345 8.9578 40 20.0172 40C31.0422 40 40 31.0345 40 '
                + '20C40 8.96552 31.0422 0 20.0172 0ZM20.0172 37.2069C10.5426 37.2069 2.82515 29.4828 2.82515 '
                + '20C2.82515 10.5172 10.5426 2.7931 20.0172 2.7931C29.4918 2.7931 37.2093 10.5172 37.2093 20C37.2093 '
                + '29.4828 29.4918 37.2069 20.0172 37.2069Z'}
            fill={color}
        />
        <path
            d={'M29.2158 18.4133H21.4294V10.5857C21.4294 9.79257 20.8092 9.17188 20.0168 9.17188C19.2244 9.17188 '
                + '18.6042 9.79257 18.6042 10.5857V18.3788H10.8178C10.0254 18.3788 9.40527 18.9995 9.40527 '
                + '19.7926C9.40527 20.5857 10.0254 21.2064 10.8178 21.2064H18.6042V28.9995C18.6042 29.7926 19.2244 '
                + '30.4133 20.0168 30.4133C20.8092 30.4133 21.4294 29.7926 21.4294 28.9995V21.2064H29.2158C30.0082 '
                + '21.2064 30.6284 20.5857 30.6284 19.7926C30.6284 18.9995 30.0082 18.4133 29.2158 18.4133Z'}
            fill={color}
        />
    </svg>
);

AddIcon.propTypes = {
    color: PropTypes.string,
};

AddIcon.defaultProps = {
    color: '#8C8D8F',
};

export const AddFilledIcon = ({ color }) => (
    <svg width="100%" height="100%" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={'M0 22C0 9.84863 9.84863 0 22 0C34.1514 0 44 9.84863 44 22C44 34.1514 34.1514 44 22 44C9.84863 '
                + '44 0 34.1514 0 22ZM31.4531 23.5684C32.3081 23.5684 33 22.877 33 22.0215C33 21.166 32.3081 '
                + '20.4746 31.4531 20.4746H23.5684V12.5898C23.5684 11.7344 22.8765 11.043 22.0215 11.043C21.1665 '
                + '11.043 20.4746 11.7344 20.4746 12.5898V20.4746H12.5469C11.6919 20.4746 11 21.166 11 22.0215C11 '
                + '22.877 11.6919 23.5684 12.5469 23.5684H20.4746V31.4102C20.4746 32.2656 21.1665 32.957 22.0215 '
                + '32.957C22.8765 32.957 23.5684 32.2656 23.5684 31.4102V23.5684H31.4531Z'}
            fill={color}
        />
    </svg>
);

AddFilledIcon.propTypes = {
    color: PropTypes.string,
};

AddFilledIcon.defaultProps = {
    color: '#97B725',
};
