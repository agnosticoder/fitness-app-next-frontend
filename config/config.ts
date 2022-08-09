//* I am proxying the api routes because of the CORS issue, cors won't let me set the headers in the request if I don't proxy it
const NEXT_PUBLIC_API_URL = 'http://satinder.local:3000/api';
const NODE_ENV = process.env.NODE_ENV || 'development';

export const IN_PROD = NODE_ENV === 'production';

export const config = {
    apiUrl: NEXT_PUBLIC_API_URL,
}