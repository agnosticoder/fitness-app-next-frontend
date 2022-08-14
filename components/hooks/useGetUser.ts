import { useQuery } from 'react-query';
import { config } from '../../config/config';
import { customFetch } from './useFetch';

type Data = {
    name: string;
    email: string;
}

const useGetUser = () => {
    return useQuery(['getUser'], async () => {
        const {data, error} = await customFetch<Data>(`${config.apiUrl}/user/get`);
        if(error) {
            console.log('useGetUser error', error);
            return;
        }
        return data;
    }, {
        onError: (err) => console.error(err),
    })
}

export default useGetUser;