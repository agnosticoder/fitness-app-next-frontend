import { useQuery } from 'react-query';
import { customFetch } from './useFetch';
import { config } from '../../config/config';
import { setNotificationAtom } from '../store/atoms';
import { useSetAtom } from 'jotai';

const useGetLatestExercise = ({ name }: { name: string }) => {
    const setNotification = useSetAtom(setNotificationAtom);
    return useQuery(['latestexercise', name], async () => {
        const {data, error} = await customFetch(`${config.apiUrl}/exercise/${name}`);
        if(error) {
            setNotification({message: error, mode: 'info'});
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