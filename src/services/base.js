import _ from 'lodash';
import { checkIfValueEmpty } from 'components/utils';

export function checkStatus(response, handler) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    if (handler) {
        handler(response);
    }

    return response.json().then((data) => {
        const error = new Error(response.statusText);
        error.response = response;
        error.data = data;
        throw error;
    });
}

export const defaultHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export const url = BACKEND_URL;

export function buildGetService(
    path,
    dehydrate = _.identity,
    headers = defaultHeaders
) {
    return async (handler, cursor) => {
        cursor.set('status', 'Loading');
        let result = {};

        try {
            let response = await fetch(`${url}${path}`,
                { headers }).then((resp) => checkStatus(resp, handler));
            const data = await response.json();
            const dehydratedData = await dehydrate(data);
            result = {
                data: dehydratedData,
                status: 'Succeed',
            };
        } catch (error) {
            result = {
                error,
                status: 'Failure',
            };
        }
        cursor.set(result);
        return result;
    };
}

export function buildPostService(
    path,
    method = 'POST',
    hydrate = JSON.stringify,
    dehydrate = _.identity,
    headers = defaultHeaders
) {
    return async (handler, cursor, data) => {
        cursor.set('status', 'Loading');
        let result = {};

        const body = await hydrate(data);
        const payload = {
            body,
            method,
            headers,
        };

        try {
            let response = await fetch(`${url}${path}`, payload)
                .then((resp) => checkStatus(resp, handler));
            let dehydratedData = cursor.get('data');
            if (response.status !== 204) {
                const respData = await response.json();
                dehydratedData = await dehydrate(respData);
            }
            result = {
                status: 'Succeed',
                data: dehydratedData,
            };
            cursor.set(result);
        } catch (error) {
            result = {
                error,
                status: 'Failure',
            };
            cursor.set('error', result.error);
            cursor.set('status', result.status);
        }
        return result;
    };
}

export function wrapItemsAsRemoteData(items) {
    return _.map(items, (data) => ({
        data,
        status: 'Succeed',
    }));
}

export function dehydrateBundle(bundle) {
    return bundle.results;
}

export function paramsToString(data) {
    const params = _.chain(data)
        .omitBy((value) => checkIfValueEmpty(value))
        .mapKeys((value, key) => _.snakeCase(key))
        .value();
    let paramsRow = '?';

    _.forEach(params, (value, key) => {
        if (paramsRow === '?') {
            paramsRow += `${key}=${value}`;
        } else {
            paramsRow += `&${key}=${value}`;
        }
    });

    return paramsRow;
}

export function hydrateFormData(data) {
    let formData = new FormData();

    _.forEach(data, (value, key) => formData.append(key, value));

    return formData;
}
