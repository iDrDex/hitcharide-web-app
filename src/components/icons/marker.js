import React from 'react';
import PropTypes from 'prop-types';

export const MarkerIcon = ({ color }) => (
    <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d={'M18.6289 19.832C15.8522 19.832 13.5385 17.5182 13.5385 14.7416C13.5385 11.9649 15.8522 9.65112 '
                + '18.6289 9.65112C21.4056 9.65112 23.7193 11.9649 23.7193 14.7416C23.7193 17.5182 21.6368 '
                + '19.832 18.6289 19.832ZM18.6289 7.10571C14.4475 7.10571 10.9933 10.5599 10.9933 14.7414C10.9933 '
                + '18.9229 14.4475 22.377 18.6289 22.377C22.8104 22.377 26.2646 18.9229 26.2646 14.7414C26.2646 '
                + '10.5599 22.9923 7.10571 18.6289 7.10571Z'}
            fill={color}
        />
        <mask id="mask0" masktype="alpha" maskUnits="userSpaceOnUse" x="4" y="0" width="29" height="36">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.5629 0.203369V35.8374H4.09094V0.203369L32.5629 0.203369V0.203369Z"
                fill="white"
            />
        </mask>
        <g mask="url(#mask0)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={'M18.3268 31.9469C18.3268 31.9469 6.67908 20.8721 6.67908 14.4393C6.67908 8.00646 11.894 '
                    + '2.79175 18.3268 2.79175C24.7596 2.79175 29.9745 8.00646 29.9745 14.4393C29.9745 20.8721 18.3268 '
                    + '31.9469 18.3268 31.9469ZM18.3269 0.203369C10.4647 0.203369 4.09082 6.577 4.09082 '
                    + '14.4392C4.09082 22.3017 18.3269 35.8375 18.3269 35.8375C18.3269 35.8375 32.563 22.3017 '
                    + '32.563 14.4392C32.563 6.577 26.1891 0.203369 18.3269 0.203369Z'}
                fill={color}
            />
        </g>
    </svg>
);

MarkerIcon.propTypes = {
    color: PropTypes.string,
};

MarkerIcon.defaultProps = {
    color: 'white',
};
