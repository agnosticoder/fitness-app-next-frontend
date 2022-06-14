import { useEffect, useRef, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';

export const customFetch = async <T = unknown>(url: string, options?: RequestInit) => {
    try {
        const response = await fetch(url, options);
        console.log('response', response);
        // 1.1 check if response is json
        const isJson = response.headers.get('Content-Type')?.includes('application/json');

        // 1. Check if reponse is ok
        if (response.ok && isJson) {
            const {data, code} = (await response.json()) as {data: T, code: number};
            return { data };

        } else if (!response.ok && isJson) {
            const error = await response.json();

            //* This error I want to show to the user (recoverable)
            if (typeof error?.error === 'string' && error.code <= 409 && error.code >= 400) {
                console.log('error', error.error);
                return { error: error.error as string };
            }
            //* Throw non-recoverable error
            if (typeof error?.error === 'string' && error.code >= 500) {
                console.log('non-recoverable error', error.error);
                throw new Error(error.error);
            }
            
            //* if error is not sent by me (server)
            console.log('error - not sent by me (server)', error);
            throw new Error('Something went wrong, json error');
        }

        //* if response is not json and not ok
        throw new Error('Something went wrong, non-json response');

    } catch (err) {
        console.log('customFetch', err);
        throw err;
    }
};

type Cache<T> = {[url: string]: T};

const useFetch = <T = unknown>(url? :string, options? : RequestInit) => {
    const cache = useRef<Cache<T>>({});

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleError = useErrorHandler();

    const fetchData = async (url?: string, options?: RequestInit) => {
        if (!url) return;

        if (cache.current[url]) {
            setData(cache.current[url]);
            setLoading(false);
            return;
        }

        try {
            setError(null);
            setLoading(true);
            const res = await customFetch<T>(url, options);
            if (res?.data) {
                setData(res.data);
                cache.current[url] = res.data;
                setLoading(false);
                return;
            }

            //* error is sent my me (server) - may be bcz of wrong user input
            if (res?.error) {
                setError(res.error);
                setLoading(false);
                return;
            }
        } catch (error) {
            //* handleError will handle non-recoverable errors
            console.warn(error);
            handleError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!url) return;
        fetchData(url, options);
    }, [url, options]);

    return { data, loading, error, fetchData };
};

export default useFetch;













// const statusCodes = [
//     { code: 200, message: 'OK' }, // GET request with data
//     { code: 201, message: 'Created' }, //in case of POST
//     { code: 202, message: 'Accepted' },
//     { code: 204, message: 'No Content' }, // useful to upadate cache or put request(update an move on)
//     { code: 400, message: 'Bad Request' }, // malformed request
//     { code: 401, message: 'Unauthorized' }, // client must authenticate
//     { code: 403, message: 'Forbidden' }, // server know the client but content is forbidden (unauthorized)
//     { code: 404, message: 'Not Found' }, // resource not found
//     { code: 405, message: 'Method Not Allowed' }, // does recogonize method but target resource does not support
//     { code: 409, message: 'Conflict' }, //in case of put request
//     { code: 500, message: 'Internal Server Error' },
//     { code: 501, message: 'Not Implemented' }, // in case of delete request
//     { code: 503, message: 'Service Unavailable' }, // server down for maintenance, user friendly page should be shown
// ];

// const notOkStatusCodes = statusCodes.filter((statusCode) => statusCode.code >= 400);

// console.log('notOkStatusCodes', notOkStatusCodes);
