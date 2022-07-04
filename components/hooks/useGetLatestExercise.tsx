import { useQuery } from 'react-query';
import { customFetch } from './useFetch';
import { useErrorHandler } from 'react-error-boundary';
import useErrorMessage from './useErrorMessage';
import { config } from '../../config/config';

const useGetLatestExercise = ({ name }: { name: string }) => {
    const handleError = useErrorHandler();
    const {handleError: handleErrorMessage} = useErrorMessage();
    return useQuery(['latestexercise', name], async () => {
        const {data, error} = await customFetch(`${config.apiUrl}/exercise/${name}`);
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