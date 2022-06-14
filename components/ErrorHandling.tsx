import useFetch from './hooks/useFetch';

const ErrorHandling = () => {
    const {loading, data, error} = useFetch('http://localhost:8000');

    console.log('loading', loading);
    console.log('data', data);
    console.log('error', error);

    return (
        <div>Error Handling</div>
    );
};

export default ErrorHandling;