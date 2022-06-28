import { useQuery } from 'react-query';
import { customFetch } from './useFetch';
import { useErrorHandler } from 'react-error-boundary';
import useErrorMessage from './useErrorMessage';

const useGetLatestExercise = ({ name }: { name: string }) => {
    const handleError = useErrorHandler();
    const {handleError: handleErrorMessage} = useErrorMessage();
    return useQuery(['latestexercise', name], async () => {
        const {data, error} = await customFetch(`http://localhost:8000/exercise/${name}`);
        if(error) {
            handleErrorMessage(error);
            return;
        }
        return data;
    },
        {
            //Todo: add error handler
            onError: (err) => console.error(err),
            enabled: !!name,
        }
    );
};

export default useGetLatestExercise;