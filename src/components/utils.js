import _ from 'lodash';
import moment from 'moment';
import { Toast } from 'antd-mobile';

/* Form validation */

function formatErrors(errors) {
    let result = {};

    _.forEach(errors, ({ path, message }) => {
        result[path] = message;
    });

    return result;
}

export async function validateForm(schema, data) {
    const result = await schema.validate(data, { abortEarly: false })
        .then((value) => ({
            value,
            isDataValid: true,
        }))
        .catch((errors) => ({
            errors: formatErrors(errors.inner),
            isDataValid: false,
        }));

    return result;
}

export function checkInputError(name, errors) {
    const hasError = _.has(errors, name) && !_.isEmpty(errors[name]);

    return {
        error: hasError,
        onErrorClick: (event) => {
            if (hasError) {
                Toast.info(_.isArray(errors[name]) ? _.join(errors[name], ' ') : errors[name]);
                event.stopPropagation();
            }
        },
    };
}

export function checkUnhandledFormErrors(form, errors) {
    return _.join(_.map(errors, (error, key) => {
        if (_.has(form, key)) {
            return null;
        }

        return error;
    }), ' ');
}

/* Token */

export function setToken(token) {
    localStorage.setItem('token', token);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function removeToken() {
    localStorage.removeItem('token');
}

/* Save/read user type to/from localStorage */

export function setUserType(type) {
    localStorage.setItem('userType', type);
}

export function getUserType() {
    return localStorage.getItem('userType') || 'passenger';
}

/* */

export function checkIfValueEmpty(value) {
    if (_.isArray(value) || _.isObject(value)) {
        if (_.isEmpty(value)) {
            return true;
        }
    }

    if (_.isNull(value)) {
        return true;
    }

    return false;
}

export function checkIfRideStarted(date) {
    return moment().utc().isSameOrAfter(moment(date).utc(), 'minute');
}

export function formatDate(date) {
    return date.format('YYYY-MM-DDTHH:mm:ssZZ');
}

export function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export function displayCity({ name, state }) {
    if (state) {
        return `${name}, ${state.shortName}`;
    }

    return name;
}

export function displayPlace({ name }) {
    return name;
}

export function displayCityPlace(city, place) {
    let result = '';
    if (city) {
        result = displayCity(city);
    }
    if (place) {
        result = `${result}, ${displayPlace(place)}`
    }

    return result;
}

export function parseQueryString(queryString) {
    let query = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}
