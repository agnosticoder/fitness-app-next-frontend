import { useSetAtom } from 'jotai';
import { useQuery } from "react-query";
import { config } from "../../config/config";
import { setNotificationAtom } from '../store/atoms';
import { customFetch } from "./useFetch";

type Payload = {
    names: string[];
}

const useGetLatestExercises = ({names}: Payload) => {
    const setNotification = useSetAtom(setNotificationAtom);
    return useQuery(['latestexercises', names], async () => {
        const {data, error} = await customFetch(`${config.apiUrl}/exercises/${names.join(',')}`);
        if(error) {
            setNotification({message: error, mode: 'error'});
            return;
        }
        return data;
    },
        {
            //Todo: add error handler
            onError: (err) => console.error(err),
            enabled: !!names.length,
        }
    );
};

export default useGetLatestExercises;