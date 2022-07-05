const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL && 'http://localhost:8000';
const NODE_ENV = process.env.NODE_ENV || 'development';

export const IN_PROD = NODE_ENV === 'production';

export const config = {
    apiUrl: NEXT_PUBLIC_API_URL,
}