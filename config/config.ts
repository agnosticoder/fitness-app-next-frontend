//* I am proxying the api routes because of the CORS issue, cors won't let me set the headers in the request if I don't proxy it
const NODE_ENV = process.env.NODE_ENV || 'development';
const NEXT_PUBLIC_API_URL = NODE_ENV === 'production' ?  'https://fitness-app-next-frontend.vercel.app/api' : 'http://satinder.local:3000/api';

export const IN_PROD = NODE_ENV === 'production';

export const config = {
    apiUrl: NEXT_PUBLIC_API_URL,
}