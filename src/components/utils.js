import _ from 'lodash';
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
        onErrorClick: () => {
            if (hasError) {
                Toast.info(_.isArray(errors[name]) ? _.join(errors[name], ' ') : errors[name]);
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

export function setToken(data) {
    localStorage.setItem('token', data.token);
}

export function getToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    return {
        data: { token },
        status: 'Succeed',
    };
}

export function logout() {
    localStorage.removeItem('token');
}
